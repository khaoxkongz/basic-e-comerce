import prisma from '../lib/prisma';

import { RepositoryAdmin } from '../repositories/admin.repo';
import { HandlerAdmin } from '../handlers/admin.handler';

const repoAdmin = new RepositoryAdmin(prisma);

export const handlerAdmin = new HandlerAdmin(repoAdmin);
