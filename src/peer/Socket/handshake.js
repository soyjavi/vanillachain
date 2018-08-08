import { networkInterfaces } from 'os';

import { C } from 'common';
import send from './modules/send';
import PKG from '../../../package.json';

const { SOCKET: { MESSAGE: { HANDSHAKE } } } = C;
const { NODE_PORT = 3001 } = process.env;

export default () => {
  const { en0 = [] } = networkInterfaces();
  const { address = '127.0.0.1' } = en0.find(({ family }) => family === 'IPv4') || {};

  send({
    type: HANDSHAKE,
    data: { networkAddress: address, port: NODE_PORT, version: PKG.version },
  });
};
