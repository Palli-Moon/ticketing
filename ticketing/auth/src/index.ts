import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter); // Is there an easier way to do this than importing them one by one and using one by one?
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);
mongoose.set('strictQuery', false); // Supress deprecation warning

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to database');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => console.log('Listening on port 3000'));
};

start();
