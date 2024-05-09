import { IVendorWithOwnerModel, IWhereVendor } from './vendor-repo.interface';

export interface IVendorApproveModel {
  id: string;
  name: string;
  isApprove: boolean;
}

export interface IRepositoryAdmin {
  findAll: () => Promise<IVendorApproveModel[]>;
  findOne: ({ id }: IWhereVendor) => Promise<{ isApprove: boolean }>;
  updateOne: ({ id }: IWhereVendor, isApprove: boolean) => Promise<IVendorWithOwnerModel>;
}
