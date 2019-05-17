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

## Running the tests

TO run the test for the api 
```
npm run test 
```
3. ### Endpoints and methods

So now you can access the following routes using provided methods
## Required Features

- User (client) can **sign up**
- User (client) can **login**
- User (client) can **request for only one loan at a time**
- User (client) can **view loan repayment history, to keep track of his/her liability or responsibilities**
- User (client) can **update profile to meetup requirement after profile rejection**
- Admin can **mark a client as verified , after confirming his/her home and work address**
- Admin can **view a specific loan application**
- Admin can **approve or reject a client’s loan application**
- Admin can **post loan repayment transaction in favour of a client**
- Admin can **view all loan applications**
- Admin can **view all current loans (not fully repaid)**
- Admin can **view all repaid loans**

## API-ENDPOINTS

- V1

`- POST /api/v1/auth/signup Create user account`

`- POST /api/v1/auth/signin Login a user`

`- GET /api/v1/user Get all user`

`- GET /api/v1/user/<:id> Get a user`

`- PATCH /api/v1/user/<:id> Update a user`

`- DELETE /api/v1/user/<:id> Delete a user`

`- POST /api/v1/loans Create a loan application`

`- GET /api/v1/loans/<:loan-id>/repayment View loan repayment history`

`- GET /api/v1/loans Get all loan applications`

`- GET /api/v1/loans?status=approved&repaid=false Get all current loans that are not fully repaid`

`- GET /api/v1/loans?status=approved&repaid=true Get all repaid loans.`

`- PATCH /api/v1/users/<:user-email>/verify Mark a user as verified`

`- GET /api/v1/loans/<:loan-id> Get a specific loan application`

`- PATCH /api/v1/loans/<:loan-id>/approve or reject a loan application`

`- PATCH /api/v1/loans/<:loan-id>/reject or reject a loan application`

`- POST /api/v1/loans/<:loan-id>/repayment Create a loan repayment record`


## Pivotal Tracker story board

[https://www.pivotaltracker.com/n/projects/2345046](https://www.pivotaltracker.com/n/projects/2345046)

## gh-pages UI

You can see a hosted version of the template at [https://swaibat.github.io/quick-credit-ui-1/](https://swaibat.github.io/quick-credit-ui-1/)

## API URL

The API is currently in version 1 (v1) and is hosted at
[https://quick-credit-api.herokuapp.com/](https://quick-credit-api.herokuapp.com/)

## API Documentation

[https://quick-credit-api.herokuapp.com/documentation](https://quick-credit-api.herokuapp.com/documentation)



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
