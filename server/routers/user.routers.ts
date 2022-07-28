import { Router } from 'express';
import controllers from '../controllers/user.controllers';

export const router = Router();

router.get('/', controllers.getUsers);
router.post('/', controllers.user);
