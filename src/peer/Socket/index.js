import WebSocket from 'ws';

import { C } from 'common';
import handshake from './handshake';
import blockPremine from './blockPremine';

const { NETWORK } = process.env;
const { SOCKET: { MESSAGE } } = C;
const MESSAGES = {
  [MESSAGE.BLOCK_PREMINE]: blockPremine,
};

export default () => {
  const ws = new WebSocket(NETWORK);

  ws.on('open', () => {
    console.info('Connected to socket.');
    handshake();
  });

  ws.on('message', (message) => {
    const { type, data = {} } = JSON.parse(message);
    if (MESSAGES[type]) MESSAGES[type](data);
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
