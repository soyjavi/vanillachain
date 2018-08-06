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
require('dotenv').load();

// Load instance
const { NODE_INSTANCE = 'peer' } = process.env;
switch (NODE_INSTANCE) {
  case 'peer':
    require('./src/peer');
    break;

  case 'network':
    require('./src/network');
    break;

  default:
    break;
}
