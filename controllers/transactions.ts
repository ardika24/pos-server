import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';
import { randomOrderNumber } from '../utils/randomNumber';

const prisma = new PrismaClient();

interface Product {
  id: number;
  quantity: number;
}

interface AddTransactionRequest {
  total_price: number;
  paid_amount: number;
  products: { id: number; quantity: number }[];
}

interface Transaction {
  no_order: string;
  total_price: number;
  paid_amount: number;
}

interface TransactionWithProducts extends Transaction {
  products: Product[];
}

interface TransactionResponse {
  transactions: TransactionWithProducts[];
}

export const addTransaction = async (
  req: Request<any, any, AddTransactionRequest>,
  res: Response
): Promise<void> => {
  try {
    const { total_price, paid_amount, products } = req.body || {};

    if (!total_price || !paid_amount || !products) {
      throw new Error('Missing required properties in request body');
    }

    const createTransaction = {
      no_order: randomOrderNumber(),
      total_price,
      paid_amount,
      transaction_detail: {
        create: products.map((product: { id: any; quantity: any }) => ({
          id_product: product.id,
          quantity: product.quantity,
        })),
      },
    };

    const transaction = await prisma.transaction.create({
      select: {
        no_order: true,
        total_price: true,
        paid_amount: true,
        transaction_detail: {
          select: {
            id_product: true,
            quantity: true,
          },
        },
      },
      data: createTransaction,
    });

    const productsToUpdate = await prisma.product.findMany({
      where: {
        id: {
          in: products.map((product: { id: number }) => product.id),
        },
      },
    });

    const productToUpdates = productsToUpdate.map((product, i) => ({
      where: {
        id: product.id,
      },
      data: {
        stock: product.stock - products[i].quantity,
      },
    }));

    await prisma.product.updateMany({ data: productToUpdates });

    res.status(201).json({
      no_order: transaction.no_order,
      total_price: transaction.total_price,
      paid_amount: transaction.paid_amount,
      products: transaction.transaction_detail.map(
        (detail: { id_product: any; quantity: any }) => ({
          id: detail.id_product,
          quantity: detail.quantity,
        })
      ),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error when creating transaction' });
  }
};

export const showTransaction = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      select: {
        no_order: true,
        total_price: true,
        paid_amount: true,
        transaction_detail: {
          select: {
            id_product: true,
            quantity: true,
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const listTransactions: TransactionWithProducts[] = [];

    for (const transaction of transactions) {
      const products: Product[] = transaction.transaction_detail.map(
        (detail) => ({
          id: detail.id_product,
          quantity: detail.quantity,
        })
      );
      listTransactions.push({
        no_order: transaction.no_order,
        total_price: transaction.total_price,
        paid_amount: transaction.paid_amount,
        products,
      });
    }

    res.status(201).json({ transactions: listTransactions });
  } catch (error) {
    res.status(403).json({ message: 'Error When fetching transactions' });
  }
};
