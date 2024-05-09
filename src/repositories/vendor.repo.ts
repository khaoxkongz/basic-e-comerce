import { DbDriver } from '../lib/prisma';
import { BaseRepository } from './base.repo';
import { IRepositoryVendor } from '../interfaces/repositories/vendor-repo.interface';
import { createVendor, defaultVendorSelect, defaultVendorWithOwnerSelect } from '../utils/helper.utils';

class RepositoryVendor extends BaseRepository implements IRepositoryVendor {
  constructor(_prisma: DbDriver) {
    super(_prisma);
  }

  public createOne: IRepositoryVendor['createOne'] = async ({ id, username }, { name }) => {
    return await this._prisma.vendor.create({
      data: createVendor(name, { id, username }),
      select: defaultVendorWithOwnerSelect(),
    });
  };

  public findOne: IRepositoryVendor['findOne'] = async ({ id }) => {
    return await this._prisma.vendor.findUniqueOrThrow({
      where: { id },
      select: defaultVendorWithOwnerSelect(),
    });
  };

  public findOwner: IRepositoryVendor['findOwner'] = async ({ id, username }) => {
    return await this._prisma.vendor.findFirstOrThrow({
      where: { owner: { id, username } },
      select: defaultVendorWithOwnerSelect(),
    });
  };

  public updateOne: IRepositoryVendor['updateOne'] = async ({ id }, { name }) => {
    return await this._prisma.vendor.update({
      where: { id },
      data: { name },
      select: defaultVendorSelect(),
    });
  };

  public deleteOne: IRepositoryVendor['deleteOne'] = async ({ id }) => {
    return await this._prisma.vendor.delete({
      where: { id },
      select: defaultVendorSelect(),
    });
  };
}

export { RepositoryVendor };
