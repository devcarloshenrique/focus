import express from 'express'
import TaskController from '../controllers/taskController.js'
import authController from '../controllers/authController.js';

const router = express.Router();

router.get('/', authController.verifyToken, TaskController.getByUserId);
router.get('/:id', authController.verifyToken, TaskController.getById);
router.post('/create', authController.verifyToken, TaskController.create);
router.put('/:id', authController.verifyToken, TaskController.update);
router.delete('/:id', authController.verifyToken, TaskController.delete);

export default router;