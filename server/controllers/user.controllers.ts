import { PrismaClient } from '@prisma/client';
import { Company, User } from '../../types/types';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const signup = async (req: Request, res: Response) => {
  const userData: User = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });
  if (user) {
    res.status(409).send({ error: 409, message: 'User already exists' });
  }
  if (userData.password === '') throw new Error();
  const hash = await bcrypt.hash(userData.password, 10);
  userData.password = hash;
  try {
    const newUser = await prisma.user.create({
      data: userData,
    });
    res.status(201);
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error, message: 'Could not create user' });
  }
};

// const getUsers = async (req: Request, res: Response) => {
//   const allUsers: User[] = await prisma.user.findMany();
//   res.send(allUsers);
// };

const signin = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: req.body.uid,
      },
      include: { companies: true },
    });
    if (user && req.body.password) {
      const validatedPass = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validatedPass) throw new Error('Credentials incorrect');
    }
    if (!user) throw new Error('Credentials incorrect');
    res.send(user);
  } catch (e) {
    console.error('error', e);
    if (e) {
      console.log(e);
      throw new Error();
    }
  }
};

export default { signup, signin };
