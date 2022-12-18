import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('product', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('code').notNullable();
    table.integer('quantity').notNullable();
    table.boolean('is_active').notNullable();

    table.integer('category_id')
      .notNullable()
      .references('id')
      .inTable('category')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('product');
}