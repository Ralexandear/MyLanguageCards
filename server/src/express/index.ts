import 'dotenv/config';
import express from 'express';
import Config from '../Config';
import cors from 'cors'
import { NodeEnv } from '../enums/NodeEnvEnum';
import DatabaseInitialisationPromise from '../database';
import router from './routes';
import errorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';

const PORT = process.env.PORT || 1
const app = express();
app.use(cors());
app.use(express.json())
app.use('/api', router)

app.use(errorHandlingMiddleware)

const start = async () => {
  try {
    await DatabaseInitialisationPromise;
    app.listen(PORT, () => console.log('Server started on port', PORT))
  } catch (err) {
    if (Config.NODE_ENV === NodeEnv.production) {

    }
  }
}

start()


