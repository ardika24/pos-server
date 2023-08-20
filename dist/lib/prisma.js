"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient({
    log: ['query'],
});
exports.prisma = prismaClient;
if (process.env.NODE_ENV !== 'production')
    global.prisma = prismaClient;
