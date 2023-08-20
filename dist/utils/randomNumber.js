"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomOrderNumber = void 0;
const randomOrderNumber = () => {
    const prefix = 'T', randomNumber = Math.floor(Math.random() * 1000);
    return prefix + randomNumber;
};
exports.randomOrderNumber = randomOrderNumber;
