import { Router } from 'express';
import controllers from '../controllers/user.controllers';

export const router = Router();

router.get('/signup', controllers.signup);
router.post('/signin', controllers.signin);
