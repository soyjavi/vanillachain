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
require('./src');
