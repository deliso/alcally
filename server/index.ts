import Express from 'express';
import { router } from './routers/user.routers';
import cors from 'cors';
import { companyRouter } from './routers/company.routers';

const app = Express();

const PORT = 3000;

app.use(cors());
app.use(Express.json());
app.use(router);
app.use(companyRouter);
app.listen(PORT, () => {
  // console.log(`Listening on http://localhost:${PORT}`);
});
