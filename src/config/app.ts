import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '@src/docs';
import routes from '@src/routes';

import errorHandler from '@helpers/errorHandler';
import responseHandler from '@helpers/responseHandler';

import database from './database';

database();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);
app.use(errorHandler);
app.use(responseHandler);

export default app;
