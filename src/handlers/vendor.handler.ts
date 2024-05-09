import { BaseHandler } from './base.handler';

import { IHandlerVendor } from '../interfaces/handlers/vendor-handler.interface';
import { IRepositoryVendor } from '../interfaces/repositories/vendor-repo.interface';

import { mapToVendorDto, mapToVendorWithOwnerDto } from '../utils/mapper.utils';

class HandlerVendor extends BaseHandler<IRepositoryVendor> implements IHandlerVendor {
  constructor(_repo: IRepositoryVendor) {
    super(_repo);
  }

  public createOne: IHandlerVendor['createOne'] = async (req, res) => {
    const { name } = req.body;
    const { id, username } = res.locals.payload;

    try {
      const raw = await this._repo.createOne({ id, username }, { name });

      const dto = mapToVendorWithOwnerDto(raw);

      return res.status(201).json(dto).end();
    } catch (error) {
      console.error(error);

      if (error.code === 'P2014') {
        return res.status(400).json({ message: 'One User One Vendor' }).end();
      }

      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public findOne: IHandlerVendor['findOne'] = async (req, res) => {
    const { id, username } = res.locals.payload;

    try {
      const raw = await this._repo.findOwner({ id, username });

      const dto = mapToVendorWithOwnerDto(raw);

      return res.status(200).json(dto).end();
    } catch (error) {
      console.error(error);

      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'This content may existed or dose not existed' }).end();
      }

      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public updateOne: IHandlerVendor['updateOne'] = async (req, res) => {
    const { id: vendorId } = req.params;
    const { name } = req.body;
    const { id, username } = res.locals.payload;

    try {
      const old = await this._repo.findOne({ id: vendorId });

      if (id !== old.owner.id || username !== old.owner.username) {
        return res.status(403).json({ message: 'Access Deny, This request is forbidden' }).end();
      }

      const raw = await this._repo.updateOne({ id: vendorId }, { name });

      const dto = mapToVendorDto(raw);

      return res.status(200).json(dto).end();
    } catch (error) {
      console.error(error);

      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'This content may existed or dose not existed' }).end();
      }

      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public deleteOne: IHandlerVendor['deleteOne'] = async (req, res) => {
    const { id: vendorId } = req.params;
    const { id, username } = res.locals.payload;

    try {
      const old = await this._repo.findOne({ id: vendorId });

      if (id !== old.owner.id || username !== old.owner.username) {
        return res.status(403).json({ message: 'Access Deny, This request is forbidden' }).end();
      }

      const raw = await this._repo.deleteOne({ id: vendorId });

      const dto = mapToVendorDto(raw);

      return res.status(200).json(dto).end();
    } catch (error) {
      console.error(error);

      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'This content may existed or dose not existed' }).end();
      }

      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };
}

export { HandlerVendor };
