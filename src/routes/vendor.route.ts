import { Router } from 'express';
import { handlerVendor } from '../bootstrap/vendor.bootstrap';
import { authenticateJwt } from '../middlewares/auth.middleware';

const routerVendor = Router();

routerVendor.use(authenticateJwt);

routerVendor.post('/vendor', handlerVendor.createOne);
routerVendor.get('/vendor', handlerVendor.findOne);
routerVendor.patch('/vendor/:id', handlerVendor.updateOne);
routerVendor.delete('/vendor/:id', handlerVendor.deleteOne);

export default routerVendor;
