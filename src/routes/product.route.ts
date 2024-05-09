import { Router } from 'express';
import { handlerProduct } from '../bootstrap/product.bootstrap';
import { authenticateJwt } from '../middlewares/auth.middleware';

const routerProduct = Router();

routerProduct.use(authenticateJwt);

routerProduct.get('/product', handlerProduct.findAll);
routerProduct.get('/product/:id', handlerProduct.findOne);
routerProduct.post('/product', handlerProduct.createOne);
routerProduct.patch('/product/:id', handlerProduct.updateOne);
routerProduct.delete('/product/:id', handlerProduct.deleteOne);

export default routerProduct;
