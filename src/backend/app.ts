import express from 'express';
import { connect as connectToDatabase } from 'mongoose';
import { config as loadENV } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import AuthController from './controllers/auth';
import errorMiddleware from './middleware/error';

loadENV();

const app = express();

(async () => {
  try {
    await connectToDatabase(process.env.DB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.use(cors());
    app.use(cookieParser());

    app.use('/api/auth', new AuthController().router);
    app.use(errorMiddleware);

    app.listen(process.env.BACKEND_PORT);
  } catch (error) {
    console.error(error);
  }
})();
