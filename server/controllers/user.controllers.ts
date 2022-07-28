import { PrismaClient } from '@prisma/client';
import { User } from '../types/types';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const user = async (req: Request, res: Response) => {
  const userData: User = req.body;
  try {
    await prisma.user.create({
      data: userData,
    });
    res.status(201);
    res.end('ok');
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  const allUsers: User[] = await prisma.user.findMany();
  res.send(allUsers);
};

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
export default { user, getUsers };
