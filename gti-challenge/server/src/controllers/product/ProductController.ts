import {Request, Response} from 'express';
import db from '../../database/connection';


export default class ProductsController {
  
  async create (request: Request, response: Response) {
    const {
      name,
      code,
      quantity,
      is_active,
      category_id
    } = request.body;
  
    const transaction = await  db.transaction();
  
    try {
      await transaction('product').insert({
        name,
        code,
        quantity,
        is_active,
        category_id,
      });
  
      await transaction.commit();
  
      return response.status(201).send();
    } catch (err) {
      await transaction.rollback();
      console.log("Err detailed description: "+ err);
      return response.status(400).json({
        error: 'Unexpected error while creating new product',
      });
    }
  };
  
  async listAll (request: Request, response: Response) {
    try{
      const products = await db('product')
        .join('category', 'product.category_id', '=', 'category.id')
          .select([
            'category.name as name_category', 'product.*'
          ]);
      return response.status(200).json(products);
    }catch(err){
      console.log("Err detailed description: "+ err);
      return response.status(400).json({
        error: 'Unexpected error while listing products',
      });
    }
  };

  async findById (request: Request, response: Response) {
    try{
      const { id } = request.params;
      const product = await db('product')
        .where('product.id', '=', id)  
          .select([
            'product.*'
          ]);
      return response.json(product);
    }catch(err){
      console.log("Err detailed description: "+ err);
      return response.status(400).json({
        error: 'Unexpected error while find product',
      });
    }
  };

  async edit (request: Request, response: Response) {
    const transaction = await  db.transaction();
    const { id } = request.params;
    const { 
      name,
      code,
      quantity,
      is_active,
      category_id
     } = request.body;
    try{
      await transaction('product')
        .where('product.id', '=', id)
          .update({
            name: name,
            code: code,
            quantity: quantity,
            is_active: is_active,
            category_id: category_id
          });
      await transaction.commit();
      return response.status(201).send();
    }catch(err){
      await transaction.rollback();
      console.log("Err detailed description: "+ err);
      return response.status(400).json({
        error: 'Unexpected error while edit categories',
      });
    }
  };
  
  async delete (request: Request, response: Response) {
    const transaction = await  db.transaction();
    const { id } = request.params;
    try{
      await transaction('product')
        .where('product.id', '=', id)
          .delete();
      await transaction.commit();
      return response.status(201).send();
    }catch(err){
      await transaction.rollback();
      console.log("Err detailed description: "+ err);
      return response.status(400).json({
        error: 'Unexpected error while delete products',
      });
    }

  };
}