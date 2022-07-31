import { PrismaClient } from '@prisma/client';
// import { Action } from '../../types/types';
import { Request, Response } from 'express';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

// const getActionById = async (id: string) => {
//   const action: Action | null = await prisma.action.findUnique({
//     where: { id: id },
//   });
//   return action;
// };

const completeAction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedAction = await prisma.action.update({
    where: {
      id: id,
    },
    data: {
      completed: true,
    },
  });
  res.json(updatedAction);
};

export default { completeAction };
