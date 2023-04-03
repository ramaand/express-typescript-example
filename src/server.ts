import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import { config } from './config/config';
import i18n from './config/i18n';
import Logging from './library/Logging';
import { dbConnectionHandler } from './utils/dbConnectionHandler';

const app = express();

/** set i18n configuration */
app.use(i18n.init);

/** Mongo connection status handler */
dbConnectionHandler();

/** Connect to Mongo */
Logging.info(i18n.__('CONNECTING_SERVER'));
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info(i18n.__('CONNECTED_DB'));
    Logging.info(i18n.__('RUNNING_ON_PORT', { port: config.server.port.toString() }));
    // startServer()
  })
  .catch((error) => {
    Logging.error('Unable to connect : ');
    Logging.error(error);
  });

const startServer = () => {
  app.use((req, res, next) => {
    /** Log the Request */
    Logging.info(
      `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
      /** Log the Response */
      Logging.info(
        `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });

    next();
  });

  /** Middlewares */
  //use cors
  app.use(cors());
  // for cookie
  app.use(cookieParser());
  // for parsing application/json
  app.use(express.json());
  // for parsing multipart/form-data
  app.use(multer().array('files-upload'));
  app.use(express.static('public'));
  // for parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  /** Rules of API */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  defineRoutes((routes) => {
    routes.map((route) => {
      app.use(route.url, route.component);
    });
  });

  /** Healtcheck */
  app.get('/ping', (req, res, next) => createResponse(res, { message: 'pong' }));

  /** Not found handling */
  app.get('*', (req, res) => {
    createResponse(res, createError(StatusCodes.NOT_FOUND, 'Not Found'));
  });

  /** Error handling */
  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!';
    const response = {
      success: false,
      status: errorStatus,
      message: errorMessage
    };
    if (IS_DEV_MODE) response.stack = err.stack;
    return res.status(errorStatus).json(response);
  });

  app.listen(config.server.port, () =>
    Logging.info(i18n.__('LISTENING_ON_PORT', { PORT: config.server.port }))
  );
};
