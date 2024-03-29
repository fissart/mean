import { Router } from 'express'
const router = Router();
import upload from '../libs/img_user'
import { getsController, createController, deleteController, updateController, getupdateController } from '../2.controllers/7_land.controller'

//C
router.route('/Controller')
    .post(upload.single('image'), createController)
    .get(getsController);
//RUD
router.route('/Controller/:id')
    .delete(deleteController)
    .get(getupdateController)
    .put(upload.single('image'), updateController);

export default router;
