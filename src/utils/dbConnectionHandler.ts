import mongoose from 'mongoose';

import i18n from '../config/i18n';
import Logging from '../library/Logging';

export const dbConnectionHandler = () => {
  mongoose.connection.on('disconnected', () => {
    Logging.warn(i18n.__('DB_STATUS', { status: 'disconnected!' }));
  });
  mongoose.connection.on('error', (err) => {
    Logging.error(i18n.__('DB_ERROR', { error: err }));
  });
  mongoose.connection.on('connected', () => {
    Logging.info(i18n.__('DB_STATUS', { status: 'connected!' }));
  });
};
