import express from 'express';
import "dotenv/config";
import bodyParser from 'body-parser';
import { db } from './config/db.connection'

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
