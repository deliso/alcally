import Express from 'express';
import { PrismaClient } from '@prisma/client';

const app = Express();
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

const prisma = new PrismaClient();
