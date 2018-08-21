import { networkInterfaces } from 'os';

import { C } from 'common';
import send from './modules/send';
import PKG from '../../../package.json';

const { SOCKET: { MESSAGE: { HANDSHAKE } } } = C;
const { PORT } = process.env;

export default () => {
  const { en0 = [] } = networkInterfaces();
  const { address = '127.0.0.1' } = en0.find(({ family }) => family === 'IPv4') || {};

  send({
    type: HANDSHAKE,
    data: { networkAddress: address, port: PORT, version: PKG.version },
  });
};
