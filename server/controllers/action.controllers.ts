import { PrismaClient } from '@prisma/client';
import { Action } from '../../types/types';
import { Request, Response } from 'express';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

const getActionById = async (id: string) => {
  const action: Action | null = await prisma.action.findUnique({
    where: { id: id },
  });
  console.log(action?.completed);
  return action?.completed;
};

const completeAction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const completedStatus = await getActionById(id);
  const updatedAction = await prisma.action.update({
    where: {
      id: id,
    },
    data: {
      completed: !completedStatus,
    },
  });
  console.log(updatedAction.completed);
  res.json(updatedAction.completed);
};

export default { completeAction };
