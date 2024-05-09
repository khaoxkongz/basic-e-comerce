import { BaseHandler } from './base.handler';
import { IHandlerOrder } from '../interfaces/handlers/order-handler.interface';
import { IRepositoryOrder } from '../interfaces/repositories/order-repo.interface';
import { mapToArrayProductOrderDto, mapToOrderWithProductDto } from '../utils/mapper.utils';

class HandlerOrder extends BaseHandler<IRepositoryOrder> implements IHandlerOrder {
  constructor(_repo: IRepositoryOrder) {
    super(_repo);
  }

  public createOne: IHandlerOrder['createOne'] = async (req, res) => {
    const { quantity } = req.body;
    const { id: productId } = req.params;
    const { id: ownerId } = res.locals.payload;
    const numberOfQuantity = Number.parseInt(quantity);
    if (numberOfQuantity <= 0) {
      return res.status(400).json({ message: 'Quantity must more than 1' }).end();
    }
    try {
      const { price, quantity } = await this._repo.findOneProduct({ productId });
      if (numberOfQuantity > quantity) {
        return res.status(400).json({ message: '' }).end();
      }
      const { id: orderId } = await this._repo.createOneOrder({ ownerId, productId, price, quantity });
      await this._repo.updateOneProduct({ productId }, { quantity });
      const data = await this._repo.findOneOrder({ orderId });
      const newData = mapToOrderWithProductDto(data);
      return res.status(201).json({ data: newData }).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public findAllOrder: IHandlerOrder['findAllOrder'] = async (req, res) => {
    try {
      const data = await this._repo.findAllOrder();
      const newData = mapToArrayProductOrderDto(data);
      return res.status(200).json({ data: newData }).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public findAllProduct: IHandlerOrder['findAllProduct'] = async (req, res) => {
    const { id: productId } = req.params;
    const { id: ownerId } = res.locals.payload;
    try {
      const { vendor } = await this._repo.findOneProductOwner({ productId });
      const { owner } = vendor;
      if (ownerId !== owner.id) {
        return res.status(403).json({ message: 'This content is forbidden, maybe this content is not your' }).end();
      }
      const data = await this._repo.findAllOrderProduct({ productId });
      const newData = mapToArrayProductOrderDto(data);
      return res.status(200).json({ data: newData }).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };
}

export { HandlerOrder };
