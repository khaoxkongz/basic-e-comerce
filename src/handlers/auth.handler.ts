import { BaseHandler } from './base.handler';

import { IRepositoryAuth } from '../interfaces/repositories/auth-repo.interface';
import { IHandlerAuth } from '../interfaces/handlers/auth-handler.interface';

import { generateJwt } from '../middlewares/auth.middleware';

import { comparePassword, hashPassword } from '../utils/crypto.utils';
import { mapToUserDto } from '../utils/mapper.utils';

class HandlerAuth extends BaseHandler<IRepositoryAuth> implements IHandlerAuth {
  constructor(_repo: IRepositoryAuth) {
    super(_repo);
  }

  public login: IHandlerAuth['login'] = async (req, res) => {
    const { email, username: requestUsername, password: plainPassword } = req.body;

    try {
      const { id, username, password, isAdmin } = await this._repo.findOne({ email, username: requestUsername });

      const validate = comparePassword(plainPassword, password);

      if (!validate) {
        return res.status(400).json({ message: 'Incorrect username or password' }).end();
      }

      const token = generateJwt({ id, username, isAdmin });

      return res.status(200).json({ message: token }).end();
    } catch (error) {
      const errMsg = `failed to login user with username: ${requestUsername}`;
      console.error(`${errMsg}: ${error}`);

      if ((error.code = 'P2025')) {
        return res.status(400).json({ message: 'Incorrect username or password' }).end();
      }

      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public register: IHandlerAuth['register'] = async (req, res) => {
    const { email, username, password: plainPassword, firstName, lastName } = req.body;
    const password = hashPassword(plainPassword);
    const data = { email, username, password, firstName, lastName };

    try {
      const newUser = await this._repo.createOne(data);
      const dto = mapToUserDto(newUser);

      return res.status(201).json(dto).end();
    } catch (error) {
      const errMsg = `failed to create user with username: ${username}`;
      console.error(`${errMsg}: ${error}`);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };
}

export { HandlerAuth };
