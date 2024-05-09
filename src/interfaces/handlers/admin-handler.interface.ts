import { RequestHandler } from 'express';
import { Empty, ID, Message } from '../../utils/type.utils';
import { AuthStatus } from '../../middlewares/auth.middleware';

export interface IVendorDto {
  id: string;
  name: string;
  isApprove: boolean;
}

export interface IVendorWithOwnerDto {
  id: string;
  name: string;
  isApprove: boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
  };
}

export interface IHandlerAdmin {
  findAllApprove: RequestHandler<Empty, IVendorDto[] | Message, unknown, unknown, AuthStatus>;
  updateApprove: RequestHandler<ID, IVendorWithOwnerDto | Message, unknown, unknown, AuthStatus>;
}
