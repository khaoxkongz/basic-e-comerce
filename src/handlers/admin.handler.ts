import { BaseHandler } from './base.handler';
import { IHandlerAdmin } from '../interfaces/handlers/admin-handler.interface';
import { IRepositoryAdmin } from '../interfaces/repositories/admin-repo.interface';

class HandlerAdmin extends BaseHandler<IRepositoryAdmin> implements IHandlerAdmin {
  constructor(_repo: IRepositoryAdmin) {
    super(_repo);
  }

  public findAllApprove: IHandlerAdmin['findAllApprove'] = async (req, res) => {
    const { isAdmin } = res.locals.payload;

    if (!isAdmin) {
      return res.status(403).json({ message: 'This request is forbidden' }).end();
    }

    try {
      const raw = await this._repo.findAll();
      return res.status(200).json(raw).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public updateApprove: IHandlerAdmin['updateApprove'] = async (req, res) => {
    const { id } = req.params;
    const { isAdmin } = res.locals.payload;

    if (!isAdmin) {
      return res.status(403).json({ message: 'This request is forbidden' }).end();
    }

    try {
      const { isApprove } = await this._repo.findOne({ id });
      const raw = await this._repo.updateOne({ id }, isApprove);
      return res.status(200).json(raw).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };
}

export { HandlerAdmin };
