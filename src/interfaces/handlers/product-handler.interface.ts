import { RequestHandler } from 'express';
import { AuthStatus } from '../../middlewares/auth.middleware';
import { Empty, ID, Message } from '../../utils/type.utils';

export interface IProductDto {
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductWithVendorDto {
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  id: string;
  vendor: {
    name: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ICreateProductDto {
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface IUpdateProductDto extends Partial<ICreateProductDto> {}

export interface IHandlerProduct {
  findAll: RequestHandler<Empty, IProductWithVendorDto[] | Message, unknown, unknown, AuthStatus>;
  findOne: RequestHandler<ID, IProductWithVendorDto | Message, unknown, unknown, AuthStatus>;
  createOne: RequestHandler<Empty, IProductWithVendorDto | Message, ICreateProductDto, unknown, AuthStatus>;
  updateOne: RequestHandler<ID, IProductDto | Message, IUpdateProductDto, unknown, AuthStatus>;
  deleteOne: RequestHandler<ID, IProductDto | Message, unknown, unknown, AuthStatus>;
}
