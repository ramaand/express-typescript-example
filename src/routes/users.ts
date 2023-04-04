import express, { NextFunction, Request, Response } from 'express';

import { deleteUser, getUser, getUsers, updateUser } from '../controllers/userController';
import { verifyAdmin, verifyToken, verifyUser } from '../middleware/guardRoute';
import { IUserTokenResponse } from '../types/User';
import { createResponse } from '../utils/success';

const router = express.Router();

/** For testing only */
// router.get('/check-authentication', verifyToken, (req, res, next) => {
// 	createResponse(res, { message: req.__('CHECK_AUTH') })
// })

// router.get('/check-user/:id', verifyUser, (req, res, next) => {
// 	createResponse(res, { message: 'hello user' })
// })

// router.get('/check-admin/:id', verifyAdmin, (req, res, next) => {
//   createResponse(res, { message: 'hello admin' })
// })
/** For testing only */

router.get('/get-profile', verifyUser, (req: Request, res: Response) => {
  createResponse(res, { data: (req as IUserTokenResponse & Request).user });
});

// UPDATE
router.put('/:id', verifyUser, updateUser);
// DELETE
router.delete('/:id', verifyUser, deleteUser);
// GET
router.get('/:id', verifyUser, getUser);
// GET ALL
router.get('/', verifyAdmin, getUsers);

export default router;
