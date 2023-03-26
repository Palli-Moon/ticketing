import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@ticketingtutorial/common';
import { createChargeRouter } from './routes/create';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test', // Dev env
    secure: false, // Prod env
  })
);
app.use(currentUser);

app.use(createChargeRouter);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
