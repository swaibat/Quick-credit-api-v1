import pg from 'pg';

const config = {
  user: 'postgres', // this is the db user credential
  database: 'quick_credit',
  password: 'Kanyanyama01',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to the Database');
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
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


// export pool and createTables to be accessible  from an where within the application
module.exports = {
  createTables,
  pool,
};

require('make-runnable');
