import WebSocket from 'ws';

import { C } from 'common';
// import { block, cache } from './modules';
import PKG from '../../package.json';

const { SOCKET: { DEFAULT } } = C;
const { NODE_PORT = 3001, NODE_INSTANCE } = process.env;
const ws = new WebSocket(DEFAULT);

ws.on('open', () => {
  const handshake = {
    env: { NODE_INSTANCE, port: NODE_PORT },
    version: PKG.version,
  };
  ws.send(JSON.stringify(handshake), (error) => {
    console.error('ws.handshake', error);
  });
});

ws.on('message', (data) => {
  console.log('ws.message', JSON.parse(data));
});

ws.on('error', (error) => {
  console.error('ws.error', error);
});

ws.on('close', () => {
  // @TODO: Try to reconnect every 30 seconds
  console.info('disconnected');
});


export default ws;
