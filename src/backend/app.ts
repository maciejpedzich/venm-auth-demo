import express from 'express';
import { connect as connectToDatabase } from 'mongoose';
import { config as loadENV } from 'dotenv';
import errorMiddleware from './middleware/error';

loadENV();

const app = express();

(async () => {
  try {
    await connectToDatabase(process.env.DB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.use(errorMiddleware);
  } catch (error) {
    console.error(error);
  }
})();
