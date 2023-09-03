import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import chalk from 'chalk';
import {
  authRouter,
  recipesRouter,
  miscRouter,
  subscriptionRouter,
} from './routes/api/index.js';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { readFile } from 'fs/promises';
const swaggerDocument = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
);

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use("/public/avatars", express.static("/public/avatars"));

app.use('/api', miscRouter);
app.use('/api/auth', authRouter);
app.use('/api/recipes', recipesRouter);

app.use('/api/subscriptions', subscriptionRouter); //роут на підписку і відписку
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error', stack } = err;

  if (status === 500) {
    console.error(chalk.blackBright(stack));
    return res.status(status).json({ message: 'Server error' });
  }

  res.status(status).json({ message });
});

export default app;
