import prisma from '../lib/prisma';

import { RepositoryOrder } from '../repositories/order.repo';
import { HandlerOrder } from '../handlers/order.handler';

const repoOrder = new RepositoryOrder(prisma);

export const handlerOrder = new HandlerOrder(repoOrder);
