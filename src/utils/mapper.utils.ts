import { IProductDto, IProductWithVendorDto } from '../interfaces/handlers/product-handler.interface';
import { IVendorDto, IVendorWithOwnerDto } from '../interfaces/handlers/vendor-handler.interface';
import {
  IGroupOrderProductModel,
  IOwnerModel,
  IProductOrderModel,
} from '../interfaces/repositories/order-repo.interface';
import { IProductModel, IProductWithVendorModel } from '../interfaces/repositories/product-repo.interface';
import { DbUserModel } from '../lib/prisma';

export function mapToUserDto(data: DbUserModel) {
  return {
    id: data.id,
    email: data.email,
    password: data.password,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    isAdmin: data.isAdmin,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
}

export function mapToVendorDto(data): IVendorDto {
  return {
    id: data.id,
    name: data.name,
    isApprove: data.isApprove,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
}

export function mapToVendorWithOwnerDto(data): IVendorWithOwnerDto {
  return {
    id: data.id,
    name: data.name,
    isApprove: data.isApprove,
    owner: {
      id: data.owner.id,
      username: data.owner.username,
      firstName: data.owner.firstName,
      lastName: data.owner.lastName,
    },
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
}

export function mapToProductDto(data: IProductModel): IProductDto {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    quantity: data.quantity,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
}

export function mapToProductWithVendorrDto(data: IProductWithVendorModel): IProductWithVendorDto {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    quantity: data.quantity,
    vendor: data.vendor,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
}

export function mapToArrayProductWithVendorDto(datas: IProductWithVendorModel[]): IProductWithVendorDto[] {
  return datas.map((data) => {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      vendor: data.vendor,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    };
  });
}

export function mapToOwnerDto(data: IOwnerModel) {
  return {
    userId: data.id,
    username: data.username,
  };
}

export function mapToProductOrderDto(data: IProductOrderModel[]) {
  return data.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
    totalAmount: item.totalAmount,
  }));
}

export function mapToOrderWithProductDto(data: IGroupOrderProductModel) {
  return {
    orderId: data.id,
    orderBy: mapToOwnerDto(data.user),
    products: mapToProductOrderDto(data.items),
  };
}

export function mapToArrayProductOrderDto(data: IGroupOrderProductModel[]) {
  return data.map((order) => ({
    orderId: order.id,
    orderBy: mapToOwnerDto(order.user),
    products: mapToProductOrderDto(order.items),
  }));
}
