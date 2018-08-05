// import url from 'url';
import WebSocket from 'ws';

import PKG from '../../package.json';

const TYPE = {
  LATEST_BLOCK: 'LATEST_BLOCK',
  ALL_BLOCKS: 'ALL_BLOCKS',
  ADD_PEER: 'ADD_PEER',
};

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
      peers: [],
    }));

    ws.on('close', () => {
      const index = peers.indexOf(remoteAddress);
      if (index > -1) peers.splice(index, 1);
    });
  });

  wss.on('message', (message = {}) => {
    const { type, data } = JSON.parse(message);

    console.log('wss[message]', type, data);

    switch (message.type) {
      case TYPE.LATEST_BLOCK:
        break;

      case TYPE.ALL_BLOCKS:
        break;

      case TYPE.ADD_PEER:
        break;

      default:
        break;
    }
  });

  return wss;
};

export { peers };
