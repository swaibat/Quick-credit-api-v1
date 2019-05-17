import express from 'express'
import usersRoute from './api/routes/users'
import loansRoute from './api/routes/loans'
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from './swagger.json';

const app = express();
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/loans', loansRoute);

// if the page is not found
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: error.status || 500, message: error.message  });
  next()
});


app.listen(process.env.PORT || 8080, () => console.log('listening on port 8080'));
