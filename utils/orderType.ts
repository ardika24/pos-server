import { Product } from '@prisma/client';

export type Order = {
  id?: number;
  no_order: string;
  total_price: number;
  paid_amount: number;
  products?: Product[];
};
