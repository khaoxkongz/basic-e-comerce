import { DbDriver } from '../lib/prisma';

class BaseRepository {
  constructor(protected readonly _prisma: DbDriver) {}
}

export { BaseRepository };
