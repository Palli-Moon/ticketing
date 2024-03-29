import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { errorHandler, NotFoundError, currentUser } from '@ticketingtutorial/common';
import { createTicketRouter } from './routes/create';
import { readTicketRouter } from './routes/read';
import { updateTicketRouter } from './routes/update';

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

app.use(createTicketRouter);
app.use(readTicketRouter);
app.use(updateTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
