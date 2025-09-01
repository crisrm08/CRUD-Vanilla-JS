import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { config } from './config/env.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/error.js';

export const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export const PORT = config.PORT || 5000;
