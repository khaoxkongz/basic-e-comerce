import { DbUserModel } from '../../lib/prisma';

interface IWhereUser {
  email?: string;
  username?: string;
}

interface ICreateUser {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IRepositoryAuth {
  findOne: ({ email, username }: IWhereUser) => Promise<DbUserModel>;
  createOne: (data: ICreateUser) => Promise<DbUserModel>;
}
