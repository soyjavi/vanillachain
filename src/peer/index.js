import bodyParser from 'body-parser';
import express from 'express';
import http from 'http';

import home from './home';
import block from './block';
import Socket from './Socket';
import PKG from '../../package.json';

const { PORT = 3000, INSTANCE } = process.env;
const app = express();
const server = http.createServer(app);

// -- API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', home);
app.use('/block', block);

// -- Listen
server.listen(PORT, () => {
  global.ws = new Socket();
  console.log(`${PKG.name} v${PKG.version} ${INSTANCE}:${PORT}`);
});
