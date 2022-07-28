import { Router } from 'express';
import companyControllers from '../controllers/company.controllers';

export const companyRouter = Router();

// companyRouter.get('/', controllers.getCompanies);
companyRouter.get('/company', companyControllers.getCompanies);
companyRouter.post('/company', companyControllers.company);
companyRouter.delete('/company', companyControllers.deleteCompanies);
