import color from 'bash-color';

import PKG from '../../package.json';

const { name: NAME, version: VERSION } = PKG;

export default {
  NAME,
  VERSION,

  ENV: {
    PRODUCTION: 'production',
  },

  SOCKET: {
    MESSAGE: {
      HANDSHAKE: 'handshake',

      PING: 'ping',
      PONG: 'pong',

      BLOCK_PREMINE: 'block_premine',
      BLOCK_MINED: 'block_mined',
    },
  },

  TERMINAL: {
    WELCOME: `Welcome to ${color.wrap(`${NAME} v${VERSION}`, 'white', 'bold')} developer shell.`,
    HELP: `Type ${color.wrap('help', 'white', 'underline')} for a list of commands.`,
  },
};
