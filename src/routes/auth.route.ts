import { Router } from 'express';
import { handlerAuth } from '../bootstrap/auth.bootstrap';

const routerAuth = Router();

routerAuth.post('/register', handlerAuth.register);
routerAuth.post('/login', handlerAuth.login);

export default routerAuth;
