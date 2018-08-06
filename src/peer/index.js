import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

import cache from './cache';
import PKG from '../../package.json';

const { NODE_PORT = 3001, NODE_INSTANCE } = process.env;
const app = express();
const server = http.createServer(app);
const ws = new WebSocket('http://localhost:3000');

const onSocketError = (error) => {
  console.error(error);
};

// -- API
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
  const { data, previousHash } = req.body;
  const blockchain = cache(req.body);

  const { latestBlock: { hash } } = blockchain;
  if (previousHash !== hash) return res.json({ error: 'previousHash is not from the last block' });

  const newBlock = blockchain.addBlock({ data });
  return res.json(newBlock);
});

app.get('/block/last', (req, res) => {
  const blockchain = cache(req.query);

  res.json(blockchain.latestBlock);
});

// -- Socket Client
ws.on('open', () => {
  const handshake = { env: { NODE_INSTANCE, port: NODE_PORT } };
  ws.send(JSON.stringify(handshake), onSocketError);
});

ws.on('message', (data) => {
  console.log('ws.message', data);
});

ws.on('error', onSocketError);

ws.on('close', () => console.info('disconnected'));

// -- Listen
server.listen(NODE_PORT, () => {
  console.log(`${PKG.name} v${PKG.version} ${NODE_INSTANCE}:${NODE_PORT}`);
});
