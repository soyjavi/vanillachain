// import url from 'url';
import WebSocket from 'ws';

import { C } from 'common';
import { broadcast } from './modules';
// import PKG from '../../package.json';

const { NODE_ENV } = process.env;
const {
  ENV: { PRODUCTION },
  SOCKET: { MESSAGE: { HANDSHAKE, PONG, BLOCK_MINED } },
} = C;
const peers = [];

export default (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const { remoteAddress, remotePort } = req.connection;
    let peerAddress = `${remoteAddress}:${remotePort}`;

    // console.log('wss.connection', peerAddress);
    // ws.send(JSON.stringify({
    //   message: `Welcome to ${PKG.name} v${PKG.version}`,
    //   peers,
    // }));

    ws.on('message', (message) => {
      const { type, data } = JSON.parse(message);

      console.log('wss.message', type, data);

      switch (type) {
        case HANDSHAKE:
          if (NODE_ENV !== PRODUCTION) {
            const { networkAddress, port } = data;
            peerAddress = `${networkAddress}:${port}`;
          }
          if (!peers.includes(peerAddress)) peers.push(peerAddress);
          break;

        case PONG:
          break;

        case BLOCK_MINED:
          broadcast(wss, { type: BLOCK_MINED, data });
          break;

        default:
          // @TODO: Unknown message
          break;
      }
    });

    ws.on('close', () => {
      const index = peers.indexOf(peerAddress);
      if (index > -1) peers.splice(index, 1);
    });
  });

  return wss;
};

export { peers };
