import { Router } from 'express';
import actionControllers from '../controllers/action.controllers';

export const actionRouter = Router();

actionRouter.put('/complete/:id', actionControllers.completeAction);
