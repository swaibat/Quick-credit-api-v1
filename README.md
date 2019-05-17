# Quick-credit-api-v1
Quick Credit is an online lending platform that provides short term soft loans to individuals.This helps solve problems of financial inclusion as away to alleviate poverty and empower low income earners. 

[![Build Status](https://travis-ci.org/swaibat/Quick-credit-api-v1.svg?branch=develop)](https://travis-ci.org/swaibat/Quick-credit-api-v1)
[![Coverage Status](https://coveralls.io/repos/github/swaibat/Quick-credit-api-v1/badge.svg?branch=develop)](https://coveralls.io/github/swaibat/Quick-credit-api-v1?branch=develop)
[![CodeFactor](https://www.codefactor.io/repository/github/swaibat/quick-credit-api-v1/badge)](https://www.codefactor.io/repository/github/swaibat/quick-credit-api-v1)
[![dependencies Status](https://david-dm.org/swaibat/Quick-credit-api-v1/status.svg)](https://david-dm.org/swaibat/Quick-credit-api-v1)
[![devDependencies Status](https://david-dm.org/swaibat/Quick-credit-api-v1/dev-status.svg)](https://david-dm.org/swaibat/Quick-credit-api-v1?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/554af8de13a28038f471/maintainability)](https://codeclimate.com/github/swaibat/Quick-credit-api-v1/maintainability)
## Folder structure
Within Quick-credit-api folder you WIll find the following directories and files. Cross check in any of the file misses the app may have a problem while bieng excetuted

```
            Quick-credit-api-v1/
                    │
                    ├── api/
                    │   ├── models/
                    │   ├── middleware/
                    │   └── routes
                    ├── tests/
                    ├── .gitignore/
                    ├── index.mjs
                    ├── package.json
                    └──README.md
```

## Getting Started
By running the following command quick-credit-api will be automatically downloaded to your local machine so lets get started.

run 
```
npm i quick-credit-api 
```
or

```
git clone https://github.com/swaibat/quick-credit-ui.git
```
### Prerequisites

before you install the software make sure you have the following already installed on your machine

- nodejs get it [here](https://nodejs.org)
- Nodemon installed globally by runing `npm i nodemon -g`


### Installing api

A step by step series of examples that tell you how to get a development env running
1. run
```
npm i 
```
To install all the necessary packages on your local computer

2. To start your sever
```
npm start
```
this will start your application and run on **port 3000**

3. ### Endpoints and methods

So now you can access the following routes using provided methods

| method  | for what                                 |
| ------- |-----------------------------------------:|
| POST    | To POST NEW users and loans              |
| GET     | TO GET all + specific users and loans    |
| PATCH   | To EDIT some portion of data             |


And repeat

## Running the tests

TO run the test for the api 
```
npm run test 
```
or you can view the completed tests on server via [coveralls](https://coveralls.io/github/swaibat/Quick-credit-api-v1?branch=develop)

### Break down into end to end tests

these tests specifically targets the following
1. All the **http methods** to ease api usage and avoid errors in the code.
2. all Errors to easily identify error message and course of error.
3. Tests for Admin Access to specific routes to avoid other users Access to admin routes.
4. check whetther the tokens are posted successfully
5. All **status codes** to make sure all error and success are catered for
``

### coding  tests

all test are located in the test folder at the root called `test` and Mocha,Chaiand Supertest have been used as testing framework
here is sample code
```javascript
describe('Test Post Loans', () => {
  it('checks if loan posts', (done) => {
    request(app)
      .post('/api/v1/loans')
      .send({ user: 'joelb@gmail.com' })
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.have.property('status', 'pending');
        done();
      });
  });
});
```

## Author

* **Rumbiiha Swaibu** - *Initial work* - [swaibat](https://github.com/swaibat)
