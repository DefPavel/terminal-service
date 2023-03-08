require('dotenv').config();

module.exports.terminal = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8',
    timezone: 'Europe/Moscow',
  },
  searchPath: ['terminal'],
  pool: { min: 0, max: 50 },
  acquireConnectionTimeout: 10000,
  migrations: {
    directory: __dirname + '/database/migrations',
    tableName: 'migrations',
  },
  seeds: {
    directory: __dirname + '/database/seeds',
  },
};
