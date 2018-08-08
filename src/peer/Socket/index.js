import WebSocket from 'ws';

import { C } from 'common';
import handshake from './handshake';
import blockPremine from './blockPremine';

const { SOCKET } = C;
const MESSAGE = {
  block_premine: blockPremine,
};

export default () => {
  const ws = new WebSocket(SOCKET.DEFAULT);

  ws.on('open', () => {
    console.info('Connected to socket.');
    handshake();
  });

  ws.on('message', (message) => {
    const { type, data } = JSON.parse(message);

    console.log('ws.message', type);
    if (MESSAGE[type]) MESSAGE[type](data);
  });

  ws.on('error', (error) => {
    console.error('ws.error', error);
  });

  ws.on('close', () => {
    // @TODO: Try to reconnect every 30 seconds
    console.info('disconnected');
  });

  return ws;
};
