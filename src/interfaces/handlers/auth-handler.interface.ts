import { RequestHandler } from 'express';
import { DbUserModel } from '../../lib/prisma';
import { Empty, Message } from '../../utils/type.utils';

interface IUserLogin {
  email?: string;
  password: string;
  username?: string;
}

interface IUserRegister {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
}

interface IUserDto extends Omit<DbUserModel, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}

export interface IHandlerAuth {
  login: RequestHandler<Empty, IUserDto | Message, IUserLogin>;
  register: RequestHandler<Empty, IUserDto | Message, IUserRegister>;
}
