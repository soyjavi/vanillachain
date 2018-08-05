import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import WebSocket from 'ws';

import Block from 'Block';
import Blockchain from 'Blockchain';
import PKG from '../../package.json';

const { NODE_PORT = 3001, NODE_INSTANCE } = process.env;
const app = express();
const server = http.createServer(app);
const ws = new WebSocket('http://localhost:3000');
const blockchains = {};

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
  const { file = 'file', keyChain = 'keyChain', data } = req.body;
  const key = `${file}:${keyChain}`;

  // -- Cached blockchain
  let blockchain = blockchains[key];
  if (!blockchain) {
    blockchain = new Blockchain({ file, keyChain });
    blockchains[key] = blockchain;
  }

  // -- Mine Block
  const { latestBlock: { hash } } = blockchain;
  const block = new Block({ data, previousHash: hash });
  block.mine();

  // -- Comunicate to the network
  // ws.send({
  //   type: 'NEW_BLOCK', file, keyChain, block,
  // }, onSocketError);

  // Response
  res.json(block);
});

// -- Socket Client
ws.on('open', () => {
  const data = { type: 'regular', data: 'hello world' };
  ws.send(JSON.stringify(data), onSocketError);
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
