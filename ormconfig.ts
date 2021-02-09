export = {
  host: 'localhost',
  type: 'postgres',
  port: process.env.DB_PORT,
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  entities: ['./src/models/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
