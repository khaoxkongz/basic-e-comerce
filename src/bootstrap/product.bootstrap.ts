import prisma from '../lib/prisma';

import { RepositpryProduct } from '../repositories/product.repo';
import { HandlerProduct } from '../handlers/product.handler';

const repoProduct = new RepositpryProduct(prisma);

export const handlerProduct = new HandlerProduct(repoProduct);
