import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

import broadcast from './broadcast';
import Socket, { peers } from './socket';
import PKG from '../../package.json';

const { NODE_PORT = 3000, NODE_INSTANCE } = process.env;
const app = express();
const server = http.createServer(app);
const socket = Socket(server);

// -- Client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    name: PKG.name,
    version: PKG.version,
    stats: {},
  });
});

app.post('/block', (req, res) => {
  broadcast(socket, { block: { hello: 'naivechain' } });
  res.json({ block: undefined });
});

app.get('/block/last', (req, res) => {
  res.json({ lastBlock: 'unknown' });
});

app.get('/network/peers', (req, res) => {
  console.log(socket.clients);
  res.json({ peers });
});

// Listen
server.listen(NODE_PORT, () => {
  console.log(`${PKG.name} v${PKG.version} ${NODE_INSTANCE}:${NODE_PORT}`);
});
