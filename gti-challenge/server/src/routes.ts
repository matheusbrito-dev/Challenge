import express from 'express';
import CategoriesController from './controllers/category/CategoriesController';
import ProductsController from './controllers/product/ProductController';

const routes = express.Router();

const categoriesController = new CategoriesController();
const productsController = new ProductsController();

routes.post('/categories', categoriesController.create);
routes.get('/categories', categoriesController.listAll);
routes.get('/categories/:id', categoriesController.findById);
routes.patch('/categories/:id', categoriesController.edit);
routes.delete('/categories/:id', categoriesController.delete);

routes.post('/products', productsController.create);
routes.get('/products', productsController.listAll);
routes.get('/products/:id', productsController.findById);
routes.patch('/products/:id', productsController.edit);
routes.delete('/products/:id', productsController.delete);


export default routes;