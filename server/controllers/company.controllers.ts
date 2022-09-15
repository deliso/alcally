import { PrismaClient } from '@prisma/client';
import { Company, Action } from '../../types/types';
import { Request, Response } from 'express';
import insertActions from '../utils';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});

const createCompany = async (req: Request, res: Response) => {
  let companyData: Company = req.body;
  console.log('RawData Test', req.body.name);
  insertActions(companyData);
  const queryData: any = { ...companyData };
  delete queryData.id;
  queryData.actions = { createMany: { data: companyData.actions } };
  queryData.directors = { createMany: { data: companyData.directors } };
  console.log('QueryData', queryData);
  try {
    await prisma.company.create({
      data: queryData,
    });
    res.status(201);
    const resCompany = await getCompanyByName(queryData.name);
    res.json(resCompany);
  } catch (error) {
    console.log(error);
  }
};

const getCompanies = async (req: Request, res: Response) => {
  const allCompanies: Company[] = await prisma.company.findMany({
    include: {
      actions: true,
    },
  });
  res.send(allCompanies);
};

const getCompanyById = async (req: Request, res: Response) => {
  const company = await prisma.company.findUnique({
    where: { id: req.params.id },
    include: {
      actions: true,
      directors: true,
    },
  });
  res.send(company);
};
const getCompanyByName = async (name: string) => {
  const company = await prisma.company.findUnique({
    where: { name: name },
    include: {
      actions: true,
      directors: true,
    },
  });
  return company;
};

const deleteCompanies = async (req: Request, res: Response) => {
  await prisma.company.deleteMany({});
  res.send('Ok');
};

export default { getCompanies, getCompanyById, createCompany, deleteCompanies };
