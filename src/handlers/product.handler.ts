import { BaseHandler } from './base.handler';
import { IHandlerProduct } from '../interfaces/handlers/product-handler.interface';
import { IRepositoryProduct } from '../interfaces/repositories/product-repo.interface';
import { mapToArrayProductWithVendorDto, mapToProductDto, mapToProductWithVendorrDto } from '../utils/mapper.utils';

class HandlerProduct extends BaseHandler<IRepositoryProduct> implements IHandlerProduct {
  constructor(_repo: IRepositoryProduct) {
    super(_repo);
  }

  public findAll: IHandlerProduct['findAll'] = async (req, res) => {
    const { id, username } = res.locals.payload;

    try {
      const { id: vendorId, isApprove, owner } = await this._repo.findOwner({ id, username });

      if (!isApprove) {
        return res.status(400).json({ message: 'This request is forbidden, Please wait to admin approve' }).end();
      }

      const raws = await this._repo.findAll({ vendorId, ownerId: owner.id });
      const dto = mapToArrayProductWithVendorDto(raws);

      return res.status(200).json(dto).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public findOne: IHandlerProduct['findOne'] = async (req, res) => {
    const { id: productId } = req.params;
    const { id, username } = res.locals.payload;

    try {
      const { isApprove, id: defaultVendorId } = await this._repo.findOwner({ id, username });

      if (!isApprove) {
        return res.status(400).json({ message: 'This request is forbidden, Please wait to admin approve' }).end();
      }

      const raw = await this._repo.findOne({ productId });

      const {
        vendor: { id: vendorHceckId },
      } = await this._repo.findOne({ productId });

      if (defaultVendorId !== vendorHceckId) {
        return res
          .status(410)
          .json({ message: 'This request is forbidden, maybe this content is not your content' })
          .end();
      }

      const dto = mapToProductWithVendorrDto(raw);

      return res.status(200).json(dto).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public createOne: IHandlerProduct['createOne'] = async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const { id, username } = res.locals.payload;

    try {
      const { id: vendorId, owner, isApprove } = await this._repo.findOwner({ id, username });

      if (!isApprove) {
        return res.status(400).json({ message: 'This request is forbidden, Please wait to admin approve' }).end();
      }

      const raw = await this._repo.createOne({ vendorId, ownerId: owner.id }, { name, description, price, quantity });
      const dto = mapToProductWithVendorrDto(raw);

      return res.status(201).json(dto).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public updateOne: IHandlerProduct['updateOne'] = async (req, res) => {
    const { id: productId } = req.params;
    const { name, description, price, quantity } = req.body;
    const { id, username } = res.locals.payload;

    try {
      const { isApprove, id: defaultVendorId } = await this._repo.findOwner({ id, username });

      if (!isApprove) {
        return res.status(400).json({ message: 'This request is forbidden, Please wait to admin approve' }).end();
      }

      const {
        vendor: { id: vendorHceckId },
      } = await this._repo.findOne({ productId });

      if (defaultVendorId !== vendorHceckId) {
        return res
          .status(410)
          .json({ message: 'This request is forbidden, maybe this content is not your content' })
          .end();
      }

      const raw = await this._repo.updateOne({ productId }, { name, description, price, quantity });
      const dto = mapToProductDto(raw);

      return res.status(200).json(dto).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };

  public deleteOne: IHandlerProduct['deleteOne'] = async (req, res) => {
    const { id: productId } = req.params;
    const { id, username } = res.locals.payload;

    try {
      const { isApprove, id: defaultVendorId } = await this._repo.findOwner({ id, username });

      if (!isApprove) {
        return res.status(400).json({ message: 'This request is forbidden, Please wait to admin approve' }).end();
      }

      const raw = await this._repo.deleteOne({ productId });

      const {
        vendor: { id: vendorHceckId },
      } = await this._repo.findOne({ productId });

      if (defaultVendorId !== vendorHceckId) {
        return res
          .status(410)
          .json({
            message: 'This request is forbidden, This request is forbidden, maybe this content is not your content',
          })
          .end();
      }

      const dto = mapToProductDto(raw);

      return res.status(200).json(dto).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' }).end();
    }
  };
}

export { HandlerProduct };
