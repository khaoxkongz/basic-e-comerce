import prisma from '../lib/prisma';

import { RepositoryVendor } from '../repositories/vendor.repo';
import { HandlerVendor } from '../handlers/vendor.handler';

const repoVendor = new RepositoryVendor(prisma);

export const handlerVendor = new HandlerVendor(repoVendor);
