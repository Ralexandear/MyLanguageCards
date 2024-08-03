import 'dotenv/config';
import express from 'express';
import DatabaseInitialisationPromise from './database/init';
import Config from './Config';
import { NodeEnv } from './enums/NodeEnvEnum';

const PORT = process.env.PORT || 1
const app = express();

const start = async () => {
  try {
    await DatabaseInitialisationPromise;
    app.listen(PORT, () => console.log('Server started on port', PORT))
  } catch (err) {
    if (Config.NODE_ENV === NodeEnv.production) {

    }
  }
}


