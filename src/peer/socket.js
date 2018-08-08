import WebSocket from 'ws';

import { C } from 'common';
import { block, networkAddress } from './modules';
import PKG from '../../package.json';

const { SOCKET: { DEFAULT, MESSAGE: { HANDSHAKE, BLOCK_PREMINE, BLOCK_MINED } } } = C;
const { NODE_PORT = 3001 } = process.env;

const send = (message) => {
  global.ws.send(JSON.stringify(message), (error) => {
    console.error('ws.send [error]', error);
  });
}

export default () => {
  const ws = new WebSocket(DEFAULT);

  ws.on('open', () => {
    console.info('Connected to socket.');
    send({
      type: HANDSHAKE,
      data: { networkAddress, port: NODE_PORT, version: PKG.version },
    });
  });

  ws.on('message', (message) => {
    const { type, data } = JSON.parse(message);

    console.log('ws.message', type, data);

    switch (type) {
      case BLOCK_PREMINE:
        data.mine = true;
        const newBlock = block(data);
        console.log('newBlock', newBlock);
        if (newBlock) send({ type: BLOCK_MINED, data: newBlock });
        break;

      default:
        break;
    }
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
