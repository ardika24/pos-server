import express from 'express';
import * as productController from '../controllers/products';

const products = express.Router();

products.get('/', productController.show);
products.post('/create', productController.create);

export default products;
