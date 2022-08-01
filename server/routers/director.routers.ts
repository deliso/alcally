import { Router } from 'express';
import directorControllers from '../controllers/director.controllers';

export const directorRouter = Router();

// companyRouter.get('/', controllers.getCompanies);
directorRouter.post('/director/:companyId', directorControllers.createDirector);
directorRouter.delete('/director/:id', directorControllers.deleteDirectorById);
