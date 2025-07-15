import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.enum('type', ['FUND', 'TRANSFER', 'WITHDRAWAL']).notNullable();
    table.decimal('amount', 15, 2).notNullable();
    
    table.integer('sender_id').unsigned()
      .references('id').inTable('users')
      .onDelete('SET NULL');
      
    table.integer('recipient_id').unsigned()
      .references('id').inTable('users')
      .onDelete('SET NULL');
      
    table.timestamp('created_at').defaultTo(knex.fn.now());
    
    // Indexes for faster queries
    table.index(['sender_id']);
    table.index(['recipient_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('transactions');
}


// import { Knex } from 'knex';

// export async function up(knex: Knex): Promise<void> {
//   return knex.schema.createTable('transactions', (table) => {
//     table.increments('id').primary();
//     table.enum('type', ['FUND', 'TRANSFER', 'WITHDRAWAL']).notNullable();
//     table.decimal('amount', 15, 2).notNullable();
//     table.integer('sender_id').unsigned().references('id').inTable('users');
//     table.integer('recipient_id').unsigned().references('id').inTable('users');
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//   });
// }