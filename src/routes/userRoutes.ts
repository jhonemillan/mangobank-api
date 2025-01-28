import express from 'express';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.get('/:user_id', getUserById);
router.put('/:user_id', updateUser);
router.delete('/:user_id', deleteUser);

export default router;