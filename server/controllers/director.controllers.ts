import { PrismaClient } from '@prisma/client';
import { Company, Director } from '../../types/types';
import { Request, Response } from 'express';
// import insertDirectors from '../utils';

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

const createDirector = async (req: Request, res: Response) => {
  let directorData: Director = req.body;
  const companyId: string = req.params.companyId;
  console.log('RawData Test', req.body.name);
  // insertDirector(directorData);
  const queryData: any = {
    ...directorData,
    company: { connect: { id: companyId } },
  };
  delete queryData.id;
  console.log('QueryData', queryData);
  try {
    await prisma.director.create({
      data: queryData,
    }),
      res.status(201);
    const resDirector = await getDirectorByNif(queryData.nif);
    res.json(resDirector);
  } catch (error) {
    console.log(error);
  }
};
const deleteDirectorById = async (req: Request, res: Response) => {
  const directorId: string = req.params.id;
  try {
    await prisma.director.delete({
      where: { id: directorId },
    }),
      res.status(201);
    res.json('deleted');
  } catch (error) {
    console.log(error);
  }
};

const getDirectorByNif = async (nif: string) => {
  console.log(nif);
  const director: Director | null = await prisma.director.findUnique({
    where: { nif: nif },
  });
  return director;
};

export default { createDirector, deleteDirectorById };
