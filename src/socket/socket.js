import url from 'url';
import WebSocket from 'ws';

const TYPE = {
  LAST_BLOCK: 'LAST_BLOCK',
  ALL_BLOCKS: 'ALL_BLOCKS',
  ADD_PEER: 'ADD_PEER',
};

export default (server) => {
  const socket = new WebSocket.Server({ server });

  socket.on('connection', (ws) => {
    // const location = url.parse(req.url, true);
    // You might use location.query.access_token to authenticate or share sessions
    // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', (message = {}) => {
      const { type, data } = JSON.parse(message);

      console.log('socket[message]', type, data);

      switch (message.type) {
        case TYPE.LAST_BLOCK:
          break;

        case TYPE.ALL_BLOCKS:
          break;

        case TYPE.ADD_PEER:
          break;

        default:
          break;
      }
    });

    ws.send('something');
  });

  return socket;
};
