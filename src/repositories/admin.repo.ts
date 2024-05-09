import { DbDriver } from '../lib/prisma';
import { BaseRepository } from './base.repo';
import { IRepositoryAdmin } from '../interfaces/repositories/admin-repo.interface';
import { defaultVendorApproveSelect, defaultVendorWithOwnerSelect } from '../utils/helper.utils';

class RepositoryAdmin extends BaseRepository implements IRepositoryAdmin {
  constructor(_prisma: DbDriver) {
    super(_prisma);
  }

  public findAll: IRepositoryAdmin['findAll'] = async () => {
    return await this._prisma.vendor.findMany({
      where: { isApprove: false },
      select: defaultVendorApproveSelect(),
    });
  };

  public findOne: IRepositoryAdmin['findOne'] = async ({ id }) => {
    return await this._prisma.vendor.findUniqueOrThrow({
      where: { id },
      select: { isApprove: true },
    });
  };

  public updateOne: IRepositoryAdmin['updateOne'] = async ({ id }, isApprove: boolean) => {
    return await this._prisma.vendor.update({
      where: { id },
      data: { isApprove: !isApprove },
      select: defaultVendorWithOwnerSelect(),
    });
  };
}

export { RepositoryAdmin };
