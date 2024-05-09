import prisma from '../lib/prisma';

import { HandlerAuth } from '../handlers/auth.handler';
import { RepositoryAuth } from '../repositories/auth.repo';

const repoAuth = new RepositoryAuth(prisma);

export const handlerAuth = new HandlerAuth(repoAuth);
