export interface IWhereVendor {
  id: string;
}

export interface IWhereOwner {
  id: string;
  username: string;
}

export interface IVendorModel {
  id: string;
  name: string;
  isApprove: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVendorWithOwnerModel {
  id: string;
  name: string;
  isApprove: boolean;
  owner: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateVendorModel {
  name: string;
}

export interface IUpdateVendorModel extends Partial<ICreateVendorModel> {}

export interface IRepositoryVendor {
  findOne: ({ id }: IWhereVendor) => Promise<IVendorWithOwnerModel>;
  findOwner: ({ id, username }: IWhereOwner) => Promise<IVendorWithOwnerModel>;
  createOne: ({ id, username }: IWhereOwner, { name }: ICreateVendorModel) => Promise<IVendorWithOwnerModel>;
  updateOne: ({ id }: IWhereVendor, { name }: IUpdateVendorModel) => Promise<IVendorModel>;
  deleteOne: ({ id }: IWhereVendor) => Promise<IVendorModel>;
}
