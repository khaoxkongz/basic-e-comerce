import { RequestHandler } from 'express';
import { AuthStatus } from '../../middlewares/auth.middleware';
import { Empty, ID, Message } from '../../utils/type.utils';
import { DbVendorModel } from '../../lib/prisma';

export interface IVendorDto extends Omit<DbVendorModel, 'ownerId' | 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface IVendorWithOwnerDto extends IVendorDto {
  owner: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
  };
}

interface ICreateVendorDto extends Pick<DbVendorModel, 'name'> {}

interface IUpdateVendorDto extends Partial<ICreateVendorDto> {}

export const foo: IVendorDto = {
  id: '',
  name: '',
  isApprove: true,
  createdAt: '',
  updatedAt: '',
};

export const bar: IVendorWithOwnerDto = {
  id: '',
  name: '',
  isApprove: true,
  owner: {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
  },
  createdAt: '',
  updatedAt: '',
};

export interface IHandlerVendor {
  findOne: RequestHandler<Empty, IVendorWithOwnerDto | Message, undefined, undefined, AuthStatus>;
  createOne: RequestHandler<Empty, IVendorWithOwnerDto | Message, ICreateVendorDto, undefined, AuthStatus>;
  updateOne: RequestHandler<ID, IVendorDto | Message, IUpdateVendorDto, undefined, AuthStatus>;
  deleteOne: RequestHandler<ID, IVendorDto | Message, undefined, undefined, AuthStatus>;
}
