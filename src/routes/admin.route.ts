import { Router } from 'express';
import { handlerAdmin } from '../bootstrap/admin.bootstrap';
import { authenticateJwt } from '../middlewares/auth.middleware';

const routerAdmin = Router();

routerAdmin.get('/admin/vendor', authenticateJwt, handlerAdmin.findAllApprove);
routerAdmin.patch('/admin/vendor/:id', authenticateJwt, handlerAdmin.updateApprove);

export default routerAdmin;
