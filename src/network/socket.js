// import url from 'url';
import WebSocket from 'ws';

import { C } from 'common';
import { broadcast } from './modules';
import PKG from '../../package.json';

const { SOCKET: { MESSAGE: { PONG, BLOCK_MINED } } } = C;

const peers = [];

export default (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    // const location = url.parse(req.url, true);
    // location.query.access_token to authenticate or share sessions or req.headers.cookie

    const { remoteAddress, remotePort } = req.connection;
    console.log('wss.connection', remoteAddress, remotePort);
    if (!peers.includes(remoteAddress)) peers.push(remoteAddress);

    ws.send(JSON.stringify({
      message: `Welcome to ${PKG.name} v${PKG.version}`,
      peers,
    }));

    ws.on('close', () => {
      const index = peers.indexOf(remoteAddress);
      if (index > -1) peers.splice(index, 1);
    });
  });

  wss.on('message', (message) => {
    const { type, data } = JSON.parse(message);
    console.log('wss[message]', type, data);

    switch (type) {
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

  return wss;
};

export { peers };
