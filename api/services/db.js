import pg from 'pg';
import dotenv from 'dotenv'

dotenv.config()

const config = {
  user: process.env.USER, //this is the db user credential
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DATABASE_PORT,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
});

const createTables = () => {

  const users = `CREATE TABLE IF NOT EXISTS
      users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR (50) NOT NULL,
        lastName VARCHAR (50) NOT NULL,
        email VARCHAR (50)  NOT NULL,
        status VARCHAR (50) DEFAULT 'un-verified' NOT NULL,
        address VARCHAR (50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        isAdmin BOOLEAN DEFAULT false NOT NULL
       )`;
    pool.query(users)
      .then((res) => {
        console.log(res)
        pool.end();
      })
      .catch((err) =>{
      } )
      
    const loans = `CREATE TABLE IF NOT EXISTS
        loans(
          id SERIAL PRIMARY KEY,
          createdOn timestamp without time zone DEFAULT now() NOT NULL,
          tenor INT NOT NULL,
          amount INT NOT NULL,
          repaid boolean DEFAULT false NOT NULL,
          paymentInstallment INT NOT NULL,
          balance FLOAT NOT NULL,
          interest FLOAT NOT NULL,
          userEmail VARCHAR (50)  NOT NULL,
          status VARCHAR (50)  NOT NULL
        )`;
    pool.query(loans)
      .then((res) => {
        pool.end();
      })
      .catch((err) => {
        pool.end();
      });

      
  }

  pool.on('remove', () => {
    process.exit(0);
  });
  


//export pool and createTables to be accessible  from an where within the application
export {
  createTables,
  pool,
};

require('make-runnable');