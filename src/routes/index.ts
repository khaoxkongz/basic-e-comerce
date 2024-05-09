import { Router } from 'express';

import routerAuth from './auth.route';
import routerVendor from './vendor.route';
import routerAdmin from './admin.route';
import routerProduct from './product.route';
import routerOrder from './order.route';

const router = Router();

router.get('/health', (_req, res) => res.status(200).json({ message: 'server is up' }).end());

router.use('/', routerAuth);
router.use('/', routerVendor);
router.use('/', routerAdmin);
router.use('/', routerProduct);
router.use('/', routerOrder);

export default router;
