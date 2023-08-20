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
exports.create = exports.show = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield prisma.product.findMany();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error when fetching products' });
    }
});
exports.show = show;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, stock } = req.body;
        const data = {
            name,
            price,
            stock,
        };
        const product = yield prisma.product.create({
            data,
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error when creating product' });
    }
});
exports.create = create;
