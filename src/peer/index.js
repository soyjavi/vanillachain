import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import path from 'path';

import { routeError, routeTerminal } from 'common/routes';
import block from './block';
import Socket from './Socket';
import PKG from '../../package.json';

const { PORT = 3000, INSTANCE } = process.env;
const app = express();
const server = http.createServer(app);

// -- API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -- Endpoints
app.get('/', routeTerminal);
app.use('/block', block);

// -- Assets
app.use(express.static(
  path.resolve(__dirname, '..', '..', 'public'),
  { maxAge: '1d' },
));

// -- Global Error Handler
app.use(routeError);

// -- Listen
const listener = server.listen(PORT, () => {
  global.ws = new Socket();
  console.log(`${PKG.name} v${PKG.version} ${INSTANCE}:${listener.address().port}`);
});
