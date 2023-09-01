import 'dotenv/config';
import chalk from 'chalk';
import app from './app.js';
import { db } from './helpers/index.js';

const { PORT } = process.env;
const DB_NAME = 'db-drinks';
const blue = chalk.blueBright;
const red = chalk.red;

console.log(blue('\nConnecting db...'));

try {
  await db.connect(DB_NAME);
  console.log('Database connection successful');

  console.log(blue('\nStarting server...'));
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nMode: ${app.get('env')}`);
  });
} catch ({ message }) {
  console.error(red(`Error: ${message}\n`));
  process.exit(1);
}

// import mongoose from "mongoose";
// import app from "./app.js";
// import dotenv from "dotenv";

// dotenv.config();
// const { DB_HOST, PORT } = process.env;

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("Database connection successful");
//     });
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
