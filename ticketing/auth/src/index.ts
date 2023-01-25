import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/currentuser';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(json());
app.use(currentUserRouter); // Is there an easier way to do this than importing them one by one and using one by one?
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, () => console.log('Listening on port 3000'));
