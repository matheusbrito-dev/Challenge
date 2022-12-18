## Passos para rodar o backend:
1- Yarn
1.1- Obs: O banco relacional utilizado foi o sqlite3, caso o yarn não instale corretamente execute o comando:
  yarn add ts-node-dev --dev || yarn add ts-node-dev --D
  yarn add sqlite3
1.2- Suba o banco de dados através do knex com o código:
  yarn knex:migrate
  
2- Verificar se o localhost (3333) fixo do sistema não afetará outras portas

3- Yarn start