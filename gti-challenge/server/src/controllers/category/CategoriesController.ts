import {Request, Response} from 'express';
import db from '../../database/connection';


export default class CategoriesController {

  async create (request: Request, response: Response) {
    const {
      name,
    } = request.body;
    const transaction = await db.transaction();
    try{
      const alreadyExists = await transaction('category')
        .whereExists(
          transaction('category')
            .where('category.name', '=', name)
        );
      if (alreadyExists.length === 0) {
        await transaction('category')
        .insert({
          name,});

        await transaction.commit();
  
        return response.status(201).send();
      } else {
        await transaction.rollback();
        return response.status(404).json({
          error: 'The category already exists',
        });
      }
    }catch(err){
      await transaction.rollback();

      console.log("Err detailed description: "+ err);

      return response.status(400).json({
        error: 'Unexpected error while creating new category',
      });
    }
  };
  
  async listAll (request: Request, response: Response) {
    try{
      const categories = await db('category')
        .select([
          'category.*'
        ]);
      return response.json(categories);
    }catch(err){
      console.log("Err detailed description: "+ err);
      return response.status(400).json({
        error: 'Unexpected error while listing categories',
      });
    }
  };

  async findById (request: Request, response: Response) {
    try{
      const { id } = request.params;
      const category = await db('category')
        .where('category.id', '=', id)  
          .select([
            'category.*'
          ]);
      return response.json(category);
    }catch(err){
      console.log("Err detailed description: "+ err);
      return response.status(400).json({
        error: 'Unexpected error while find category',
      });
    }
  };

  async edit (request: Request, response: Response) {
    const transaction = await  db.transaction();
    const { id } = request.params;
    const { name } = request.body;
    try{
      await transaction('category')
        .where('category.id', '=', id)
          .update({
            name: name,
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
      await transaction('category')
        .where('category.id', '=', id)
          .delete();
      await transaction.commit();
      return response.status(201).send();
    }catch(err){
      await transaction.rollback();
      console.log("Err detailed description: "+ err);
      return response.status(400).json({
        error: 'Unexpected error while delete categories',
      });
    }

  };

}