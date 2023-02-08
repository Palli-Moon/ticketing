import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@ticketingtutorial/common';
import { createTicketRouter } from './routes/create';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(createTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
