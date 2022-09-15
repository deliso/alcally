import { Router } from 'express';
import controllers from '../controllers/user.controllers';

export const router = Router();

router.post('/signup', controllers.signup);
router.post('/signin', controllers.signin);
