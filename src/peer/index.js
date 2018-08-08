import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

import home from './home';
import block from './block';
import Socket from './socket';
import PKG from '../../package.json';

const { NODE_PORT = 3001, NODE_INSTANCE } = process.env;
const app = express();
const server = http.createServer(app);

// -- API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', home);
app.use('/block', block);

// -- Listen
server.listen(NODE_PORT, () => {
  global.ws = new Socket();
  console.log(`${PKG.name} v${PKG.version} ${NODE_INSTANCE}:${NODE_PORT}`);
});
