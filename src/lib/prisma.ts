import { Order, OrderItem, PrismaClient, Product, User, Vendor } from '@prisma/client';

const prisma = new PrismaClient();

export interface DbDriver extends PrismaClient {}

export interface DbUserModel extends User {}
export interface DbVendorModel extends Vendor {}
export interface DbProductModel extends Product {}
export interface DbOrderModel extends Order {}
export interface DbOrderItemModel extends OrderItem {}

export default prisma;
