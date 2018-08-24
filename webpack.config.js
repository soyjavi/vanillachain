const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './src/common/terminal/index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        // use: ['babel-loader'],
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        }
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
};
