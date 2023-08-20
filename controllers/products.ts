import { PrismaClient, Product } from '@prisma/client';
import { Response, Request } from 'express';

const prisma = new PrismaClient();

export const show = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error when fetching products' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const data = {
      name,
      price,
      stock,
    };
    const product: Product = await prisma.product.create({
      data,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error when creating product' });
  }
};
