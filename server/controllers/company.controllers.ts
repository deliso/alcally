import { PrismaClient } from '@prisma/client';
import { Company, Action } from '../types/types';
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

const company = async (req: Request, res: Response) => {
  let companyData: Company = req.body;
  insertActions(companyData);
  const queryData: any = { ...companyData };
  queryData.actions = { createMany: { data: companyData.actions } };
  console.log('QueryData', queryData);
  try {
    await prisma.company.create({
      data: queryData,
    });
    res.status(201);
    res.end('ok');
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

const deleteCompanies = async (req: Request, res: Response) => {
  await prisma.company.deleteMany({});
  res.send('Ok');
};

export default { getCompanies, company, deleteCompanies };
