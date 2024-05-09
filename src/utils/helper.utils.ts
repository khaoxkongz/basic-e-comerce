import { ICreateOrderModel } from '../interfaces/repositories/order-repo.interface';
import {
  ICreateProductModel,
  IUpdateProductModel,
  IWhereVendorWithOwner,
} from '../interfaces/repositories/product-repo.interface';

export function defaultUserSelect() {
  return {
    id: true,
    email: true,
    password: true,
    username: true,
    firstName: true,
    lastName: true,
    isAdmin: true,
    createdAt: true,
    updatedAt: true,
  };
}

export function defaultOwnerSelect() {
  return {
    id: true,
    username: true,
    firstName: true,
    lastName: true,
  };
}

export function defaultVendorSelect() {
  return {
    id: true,
    name: true,
    isApprove: true,
    createdAt: true,
    updatedAt: true,
  };
}

export function defaultVendorWithOwnerSelect() {
  return {
    id: true,
    name: true,
    isApprove: true,
    owner: {
      select: defaultOwnerSelect(),
    },
    createdAt: true,
    updatedAt: true,
  };
}

export function createVendor(name: string, { id, username }: { id: string; username: string }) {
  return {
    name,
    owner: {
      connect: {
        id,
        username,
      },
    },
  };
}

export function defaultVendorApproveSelect() {
  return {
    id: true,
    name: true,
    isApprove: true,
  };
}

export function defaultVendorInProductSelect() {
  return {
    id: true,
    name: true,
  };
}

export function defaultOwnerVendorProductSelect() {
  return {
    id: true,
    isApprove: true,
    owner: {
      select: {
        id: true,
      },
    },
  };
}

export function defaultProductSelect() {
  return {
    id: true,
    name: true,
    description: true,
    price: true,
    quantity: true,
    createdAt: true,
    updatedAt: true,
  };
}

export function defaultProductWithVendorSelect() {
  return {
    id: true,
    name: true,
    description: true,
    price: true,
    quantity: true,
    vendor: {
      select: defaultVendorInProductSelect(),
    },
    createdAt: true,
    updatedAt: true,
  };
}

export function createProductModel({ vendorId, ownerId }: IWhereVendorWithOwner, data: ICreateProductModel) {
  return {
    name: data.name,
    description: data.description,
    price: data.price,
    quantity: data.quantity,
    vendor: {
      connect: {
        id: vendorId,
        owner: {
          id: ownerId,
        },
      },
    },
  };
}

export function updateProductModel(data: IUpdateProductModel) {
  return {
    name: data.name,
    description: data.description,
    price: data.price,
    quantity: data.quantity,
  };
}

export function defaultProductOrderSelect() {
  return {
    price: true,
    quantity: true,
  };
}

export function defaultOwnerProductSelect() {
  return {
    select: {
      id: true,
      username: true,
    },
  };
}

export function defaultOwnerOrderProductSelect() {
  return {
    select: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
      quantity: true,
      totalAmount: true,
    },
  };
}

export function defaultOrderProductSelect() {
  return {
    id: true,
    user: defaultOwnerProductSelect(),
    items: defaultOwnerOrderProductSelect(),
  };
}

export function defaultOrderOwnerSelect() {
  return {
    vendor: {
      select: {
        owner: {
          select: {
            id: true,
          },
        },
      },
    },
  };
}

export function createOrderProductOwner({ ownerId, productId, price, quantity }: ICreateOrderModel) {
  return {
    userId: ownerId,
    items: {
      create: {
        product: {
          connect: {
            id: productId,
          },
        },
        quantity,
        totalAmount: price * quantity,
      },
    },
  };
}
