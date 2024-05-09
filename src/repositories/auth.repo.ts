import { DbDriver } from '../lib/prisma';
import { BaseRepository } from './base.repo';
import { IRepositoryAuth } from '../interfaces/repositories/auth-repo.interface';
import { defaultUserSelect } from '../utils/helper.utils';

class RepositoryAuth extends BaseRepository implements IRepositoryAuth {
  constructor(_prisma: DbDriver) {
    super(_prisma);
  }

  public findOne: IRepositoryAuth['findOne'] = async ({ email, username }) => {
    return await this._prisma.user.findUniqueOrThrow({
      where: { email, username },
      select: defaultUserSelect(),
    });
  };

  public createOne: IRepositoryAuth['createOne'] = async (data) => {
    return await this._prisma.user.create({
      data,
      select: defaultUserSelect(),
    });
  };
}

export { RepositoryAuth };
