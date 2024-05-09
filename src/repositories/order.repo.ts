import { DbDriver } from '../lib/prisma';
import { BaseRepository } from './base.repo';
import { IRepositoryOrder } from '../interfaces/repositories/order-repo.interface';
import {
  createOrderProductOwner,
  defaultOrderOwnerSelect,
  defaultOrderProductSelect,
  defaultProductOrderSelect,
} from '../utils/helper.utils';

class RepositoryOrder extends BaseRepository implements IRepositoryOrder {
  constructor(_prisma: DbDriver) {
    super(_prisma);
  }

  public findOneProduct: IRepositoryOrder['findOneProduct'] = async ({ productId }) => {
    return await this._prisma.product.findUniqueOrThrow({
      where: { id: productId },
      select: defaultProductOrderSelect(),
    });
  };

  public createOneOrder: IRepositoryOrder['createOneOrder'] = async ({ ownerId, productId, price, quantity }) => {
    return await this._prisma.order.create({
      data: createOrderProductOwner({ ownerId, productId, price, quantity }),
      select: { id: true },
    });
  };

  public updateOneProduct: IRepositoryOrder['updateOneProduct'] = async ({ productId }, { quantity }) => {
    await this._prisma.product.update({
      where: { id: productId },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });
  };

  public findOneOrder: IRepositoryOrder['findOneOrder'] = async ({ orderId }) => {
    return this._prisma.order.findUniqueOrThrow({
      where: { id: orderId },
      select: defaultOrderProductSelect(),
    });
  };

  public findAllOrder: IRepositoryOrder['findAllOrder'] = async () => {
    return await this._prisma.order.findMany({
      select: defaultOrderProductSelect(),
    });
  };

  public findOneProductOwner: IRepositoryOrder['findOneProductOwner'] = async ({ productId }) => {
    return await this._prisma.product.findUniqueOrThrow({
      where: { id: productId },
      select: defaultOrderOwnerSelect(),
    });
  };

  public findAllOrderProduct: IRepositoryOrder['findAllOrderProduct'] = async ({ productId }) => {
    return await this._prisma.order.findMany({
      where: {
        items: {
          some: {
            productId,
          },
        },
      },
      select: defaultOrderProductSelect(),
    });
  };
}

export { RepositoryOrder };
