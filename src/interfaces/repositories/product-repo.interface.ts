export interface IWhereVendor {
  id: string;
  username: string;
}

export interface IWhereVendorWithOwner {
  vendorId: string;
  ownerId: string;
}

export interface IWhereProduct {
  productId: string;
}

export interface IVendorApprove {
  id: string;
  isApprove: boolean;
  owner: {
    id: string;
  };
}

export interface IProductModel {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductWithVendorModel {
  id: string;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  vendor: {
    id: string;
    name: string;
  };
}

export interface ICreateProductModel {
  name: string;
  description?: string;
  price: number;
  quantity: number;
}

export interface IUpdateProductModel extends Partial<ICreateProductModel> {}

export interface IRepositoryProduct {
  findAll: ({ vendorId, ownerId }: IWhereVendorWithOwner) => Promise<IProductWithVendorModel[]>;
  findOne: ({ productId }: IWhereProduct) => Promise<IProductWithVendorModel>;
  findOwner: ({ id, username }: IWhereVendor) => Promise<IVendorApprove>;
  createOne: (
    { vendorId, ownerId }: IWhereVendorWithOwner,
    data: ICreateProductModel
  ) => Promise<IProductWithVendorModel>;
  updateOne: ({ productId }: IWhereProduct, data: IUpdateProductModel) => Promise<IProductModel>;
  deleteOne: ({ productId }: IWhereProduct) => Promise<IProductModel>;
}
