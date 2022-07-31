import { Router } from 'express';
import companyControllers from '../controllers/company.controllers';

export const companyRouter = Router();

// companyRouter.get('/', controllers.getCompanies);
companyRouter.get('/company', companyControllers.getCompanies);
companyRouter.get('/company/:id', companyControllers.getCompanyById);
companyRouter.post('/company', companyControllers.createCompany);
companyRouter.delete('/company', companyControllers.deleteCompanies);
