require('babel-polyfill');
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env'],
  plugins: [
    ['module-resolver',
      {
        root: ['./src'],
        cwd: 'babelrc',
      },
    ],
  ],
});
require('dotenv').config();

// Load instance
const { INSTANCE } = process.env;

switch (INSTANCE) {
  case 'peer':
    require('./src/peer');
    break;

  case 'network':
    require('./src/network');
    break;

  default:
    break;
}
