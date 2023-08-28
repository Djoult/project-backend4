import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import chalk from 'chalk';
import { authRouter, recipesRouter, miscRouter } from './routes/api/index.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', miscRouter);
app.use('/api/auth', authRouter);
app.use('/api/recipes', recipesRouter);

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
