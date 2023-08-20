import express, { Request, Response } from 'express';
import * as transactionController from '../controllers/transactions';
import { randomOrderNumber } from '../utils/randomNumber';
import * as response from '../utils/response';
import { PrismaClient } from '@prisma/client';

const transactions = express.Router();
const prisma = new PrismaClient();

interface Order {
  no_order: string;
  total_price: number;
  paid_amount: number;
}

interface Product {
  id: number;
  quantity: number;
}

interface AddTransactionRequest {
  total_price: number;
  paid_amount: number;
  products: Product[];
}

transactions.get('/', transactionController.showTransaction);
transactions.post('/create', transactionController.addTransaction);

export default transactions;
