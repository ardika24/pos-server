"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showTransaction = exports.addTransaction = void 0;
const client_1 = require("@prisma/client");
const randomNumber_1 = require("../utils/randomNumber");
const prisma = new client_1.PrismaClient();
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { total_price, paid_amount, products } = req.body || {};
        if (!total_price || !paid_amount || !products) {
            throw new Error('Missing required properties in request body');
        }
        const createTransaction = {
            no_order: (0, randomNumber_1.randomOrderNumber)(),
            total_price,
            paid_amount,
            transaction_detail: {
                create: products.map((product) => ({
                    id_product: product.id,
                    quantity: product.quantity,
                })),
            },
        };
        const transaction = yield prisma.transaction.create({
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
        const productsToUpdate = yield prisma.product.findMany({
            where: {
                id: {
                    in: products.map((product) => product.id),
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
        yield prisma.product.updateMany({ data: productToUpdates });
        res.status(201).json({
            no_order: transaction.no_order,
            total_price: transaction.total_price,
            paid_amount: transaction.paid_amount,
            products: transaction.transaction_detail.map((detail) => ({
                id: detail.id_product,
                quantity: detail.quantity,
            })),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error when creating transaction' });
    }
});
exports.addTransaction = addTransaction;
const showTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield prisma.transaction.findMany({
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
        const listTransactions = [];
        for (const transaction of transactions) {
            const products = transaction.transaction_detail.map((detail) => ({
                id: detail.id_product,
                quantity: detail.quantity,
            }));
            listTransactions.push({
                no_order: transaction.no_order,
                total_price: transaction.total_price,
                paid_amount: transaction.paid_amount,
                products,
            });
        }
        res.status(201).json({ transactions: listTransactions });
    }
    catch (error) {
        res.status(403).json({ message: 'Error When fetching transactions' });
    }
});
exports.showTransaction = showTransaction;
