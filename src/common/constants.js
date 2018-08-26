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
    WELCOME: `Welcome to ${NAME} v${VERSION} developer shell.<br/>Type help for a list of commands.`,
  },
};
