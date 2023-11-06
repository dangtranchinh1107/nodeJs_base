import express from 'express';
import { signIn, signUp } from '../controller/users';
const routerAuth = express.Router();

routerAuth.post('/signup', signUp);
routerAuth.post('/signin', signIn);

export default routerAuth;