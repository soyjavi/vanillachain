import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

import PKG from '../package.json';
import Socket, { broadcast } from './socket';

const { PEERS = [], PORT = 3000 } = process.env;
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

app.post('/peer', (req, res) => {
  const { body: { peer } } = req;
  if (peer) console.log({ peer });
  res.send();
});

app.get('/peers', (req, res) => {
  res.json({ peers: PEERS });
});

app.get('/send', (req, res) => {
  const ws = new WebSocket('http://localhost:1980');

  ws.on('open', () => {
    const data = { type: 'regular', data: 'hello world' };
    ws.send(JSON.stringify(data));
    broadcast(socket, JSON.stringify(data));
  });
  ws.on('error', () => console.log('socket/error', 'connection failed'));

  res.send();
});

// Listen
server.listen(PORT, () => {
  console.log(`${PKG.name} ${PKG.version} on port ${PORT}!`);
});
