import { RequestHandler } from 'express';
import { AuthStatus } from '../../middlewares/auth.middleware';
import { Empty, ID, Message } from '../../utils/type.utils';

export interface IOwnerDto {
  userId: string;
  username: string;
}

export interface IProductDto {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalAmount: number;
}

export interface IGroupOrderProduct {
  orderId: string;
  orderBy: IOwnerDto;
  products: IProductDto[];
}

export interface IOrderWithProductDto {
  data: IGroupOrderProduct;
}

export interface IOrderWithProductArrayDto {
  data: IGroupOrderProduct[];
}

export interface ICreateOrder {
  quantity: string;
}

export interface IHandlerOrder {
  createOne: RequestHandler<ID, IOrderWithProductDto | Message, ICreateOrder, unknown, AuthStatus>;
  findAllProduct: RequestHandler<ID, IOrderWithProductArrayDto | Message, unknown, unknown, AuthStatus>;
  findAllOrder: RequestHandler<Empty, IOrderWithProductArrayDto | Message>;
}
