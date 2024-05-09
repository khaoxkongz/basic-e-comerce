import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes';

import { PORT } from './utils/config.utils';

dotenv.config();
const server = express();

server.use(express.json());
server.use(cors());

server.use('/', router);

server.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
