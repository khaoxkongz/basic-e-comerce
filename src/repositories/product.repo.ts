import { DbDriver } from '../lib/prisma';
import { BaseRepository } from './base.repo';
import { IRepositoryProduct } from '../interfaces/repositories/product-repo.interface';
import {
  createProductModel,
  defaultOwnerVendorProductSelect,
  defaultProductSelect,
  defaultProductWithVendorSelect,
  updateProductModel,
} from '../utils/helper.utils';

class RepositpryProduct extends BaseRepository implements IRepositoryProduct {
  constructor(_prisma: DbDriver) {
    super(_prisma);
  }

  public findAll: IRepositoryProduct['findAll'] = async ({ vendorId, ownerId }) => {
    return await this._prisma.product.findMany({
      where: {
        vendor: {
          id: vendorId,
          owner: {
            id: ownerId,
          },
        },
      },
      select: defaultProductWithVendorSelect(),
    });
  };

  public findOne: IRepositoryProduct['findOne'] = async ({ productId }) => {
    return await this._prisma.product.findUniqueOrThrow({
      where: { id: productId },
      select: defaultProductWithVendorSelect(),
    });
  };

  public findOwner: IRepositoryProduct['findOwner'] = async ({ id, username }) => {
    return await this._prisma.vendor.findFirstOrThrow({
      where: {
        owner: {
          id,
          username,
        },
      },
      select: defaultOwnerVendorProductSelect(),
    });
  };

  public createOne: IRepositoryProduct['createOne'] = async ({ vendorId, ownerId }, data) => {
    return await this._prisma.product.create({
      data: createProductModel({ ownerId, vendorId }, data),
      select: defaultProductWithVendorSelect(),
    });
  };

  public updateOne: IRepositoryProduct['updateOne'] = async ({ productId }, data) => {
    return await this._prisma.product.update({
      where: { id: productId },
      data: updateProductModel(data),
      select: defaultProductSelect(),
    });
  };

  public deleteOne: IRepositoryProduct['deleteOne'] = async ({ productId }) => {
    return await this._prisma.product.delete({
      where: { id: productId },
      select: defaultProductSelect(),
    });
  };
}

export { RepositpryProduct };
