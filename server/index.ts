import Express, { json } from 'express';
import controllers from './controllers';
import { router } from './routers';
import cors from 'cors';

const app = Express();

const PORT = 3000;

app.use(cors());
app.use(Express.json());
app.use(router);
app.listen(PORT, () => {
  // console.log(`Listening on http://localhost:${PORT}`);
});
