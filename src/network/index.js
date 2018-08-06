import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

import home from './home';
import block from './block';
import peers from './peers';
import Socket from './socket';
import PKG from '../../package.json';

const { NODE_PORT = 3000, NODE_INSTANCE } = process.env;
const app = express();
const server = http.createServer(app);

// -- API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', home);
app.use('/block', block);
app.use('/peers', peers);

// Listen
server.listen(NODE_PORT, () => {
  global.wss = Socket(server);

  console.log(`${PKG.name} v${PKG.version} ${NODE_INSTANCE}:${NODE_PORT}`);
});
