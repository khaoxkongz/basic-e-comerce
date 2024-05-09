import { Router } from 'express';
import { handlerOrder } from '../bootstrap/order.bootstrap';
import { authenticateJwt } from '../middlewares/auth.middleware';

const routerOrder = Router();

routerOrder.get('/order', handlerOrder.findAllOrder);

routerOrder.use(authenticateJwt);

routerOrder.post('/product/:id/order', handlerOrder.createOne);
routerOrder.get('/product/:id/order', handlerOrder.findAllProduct);

export default routerOrder;
