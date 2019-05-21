import pg from 'pg';
import dotenv from 'dotenv'
dotenv.config()

const config = {
  user: process.env.user, // this is the db user credential
  database:process.env.database,
  password: process.env.password,
  port: process.env.port
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
      pool.query(Users).catch((err) => {
        return err;
        pool.end();
      });

      const Loan = `CREATE TABLE IF NOT EXISTS
        loan (
            id SERIAL PRIMARY KEY,
            users VARCHAR (355) NOT NULL,
            createdOn TIMESTAMP DEFAULT Now(),
            status VARCHAR(128) NOT NULL,
            repaid BOOLEAN NOT NULL,
            tenor INT NOT NULL,
            amount FLOAT(4) NOT NULL,
            paymentInstallment FLOAT(4) NOT NULL,
            balance FLOAT(4) NOT NULL,
            interest FLOAT(4) NOT NULL
        )`;
      pool.query(Loan)
        .catch((err) => {
          return err;
        });

      const loanRepayment = `CREATE TABLE IF NOT EXISTS
        loanRepayment (
              id SERIAL PRIMARY KEY,
              loanId SERIAL NOT NULL,
              createdOn TIMESTAMP DEFAULT Now(),
              amount FLOAT(4) NOT NULL,
              monthlyInstallment FLOAT(4) NOT NULL,
              paidAmount FLOAT(4) NOT NULL,
              balance FLOAT(4) NOT NULL
          )`;
      pool.query(loanRepayment)
        .catch((err) => {
          return err;
        });
    };
};

pool.on('remove', () => {
  process.exit(0);
});


// export pool and createTables to be accessible  from an where within the application

export {
  createTables,
  pool,
}

require('make-runnable')
