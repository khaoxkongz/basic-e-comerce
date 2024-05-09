export interface IWhereProduct {
  productId: string;
}

export interface IOwnerModel {
  id: string;
  username: string;
}

export interface IProductModel {
  id: string;
  price: number;
  name: string;
}

export interface IProductOrderModel {
  product: IProductModel;
  quantity: number;
  totalAmount: number;
}

export interface IGroupOrderProductModel {
  id: string;
  user: IOwnerModel;
  items: IProductOrderModel[];
}

export interface ICreateOrderModel {
  ownerId: string;
  productId: string;
  price: number;
  quantity: number;
}

export interface IUpdateProductModel {
  quantity: number;
}

export interface IOrderProductModel {
  price: number;
  quantity: number;
}

export interface IProductVendorOwner {
  vendor: { owner: { id: string } };
}

export interface IRepositoryOrder {
  findOneProduct: ({ productId }: IWhereProduct) => Promise<IOrderProductModel>;
  createOneOrder: (data: ICreateOrderModel) => Promise<{ id: string }>;
  updateOneProduct: ({ productId }: IWhereProduct, { quantity }: IUpdateProductModel) => Promise<void>;
  findOneOrder: ({ orderId }: { orderId: string }) => Promise<IGroupOrderProductModel>;
  findAllOrder: () => Promise<IGroupOrderProductModel[]>;
  findOneProductOwner: ({ productId }: IWhereProduct) => Promise<IProductVendorOwner>;
  findAllOrderProduct: ({ productId }: IWhereProduct) => Promise<IGroupOrderProductModel[]>;
}
