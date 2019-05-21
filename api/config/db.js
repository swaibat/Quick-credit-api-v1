import pg from 'pg';
import dotenv from 'dotenv'
dotenv.config()

const config = {
  user: process.env.user, // this is the db user credential
  database:process.env.database,
  password: process.env.password,
  port: process.env.port,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
});

const createTables = () => {
  const Users = `CREATE TABLE IF NOT EXISTS
  users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR (128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    status VARCHAR(128) NOT NULL,
    createdOn TIMESTAMP DEFAULT Now(),
    modifiedOn TIMESTAMP NOT NULL,
    isAdmin BOOLEAN NOT NULL
   )`;

  pool.query(Users)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

pool.on('remove', () => {
  process.exit(0);
});


// export pool and createTables to be accessible  from an where within the application

export {
  createTables,
  pool,
}

require('make-runnable');
