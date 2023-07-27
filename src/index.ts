import express, { Request, Response } from 'express';
import { connectDB } from './db/connectDB';
import router from './route/blog.routes';

const app: express.Application = express();
const PORT:number = 3001;

connectDB();
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

