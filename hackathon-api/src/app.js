import express from 'express';
import path from 'path';
import logger from 'morgan';
import debug from 'debug';
import swaggerMiddleware from 'swagger-express-middleware';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';

const logError = debug('hackathon-api:error');

const app = express();

app.use(logger('dev'));

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

const swaggerFile = path.join(__dirname, '../docs/swagger.yaml');

swaggerMiddleware(swaggerFile, app, (_, middleware, api) => {
  // Add all the Swagger Express Middleware, or just the ones you need.
  // NOTE: Some of these accept optional options (omitted here for brevity)
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
  );

  app.use('/api-docs-ui', swaggerUi.serve, swaggerUi.setup(null, {
    swaggerUrl: '/api-docs',
  }));

  app.use(api.basePath, routes);

  app.use(middleware.mock());

  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(409).send(err.message);
    }
    logError(err.stack);
    return res.status(err.status).send(err.message);
  });
});

export default app;
