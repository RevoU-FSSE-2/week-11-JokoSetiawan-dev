import express from 'express';
const userRoutes = express.Router();
import userController from '../controller/user.controller';

userRoutes.post('/', userController.createUser)
userRoutes.get('/', userController.findAllUser)
userRoutes.get('/:id', userController.findUserId)
userRoutes.put('/:id', userController.updateUserData)
userRoutes.delete('/:id', userController.deleteUser)

export default userRoutes