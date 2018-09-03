import swarm from 'discovery-swarm';

import { C } from 'common';

const peers = {};
const {
  DNS, DNS_PORT, INSTANCE, PORT,
} = process.env;
const { log } = console;

const sw = swarm({
  // id: crypto.randomBytes(32), // peer-id for user
  // id: `${INSTANCE}:${PORT}`,
  // stream: stream, // stream to replicate across peers
  // connect: fn, // connect local and remote streams yourself
  utp: false, // use utp for discovery
  tcp: true, // use tcp for discovery
  // maxConnections: 2, // max number of connections.
  // whitelist: [] // array of ip addresses to restrict connections to
});

sw.on('connection', (connection, peer) => {
  const { initiator, host, port } = peer;
  const peerKey = `${host}:${port}`;

  if (initiator && !peers[peerKey]) {
    peers[peerKey] = peer;
    console.log(`  ⚡️:${PORT}:on:connection`, host, port);
  }
});


sw.on('drop', (peer) => {
  const { initiator, host, port } = peer;
  if (initiator) {
    delete peers[`${host}:${port}`];
    console.log(`  ⚡️:${PORT}:on:drop`, host, port);
  }
});

sw.on('connection-closed', (connection, peer) => {
  const { initiator, host, port } = peer;

  if (initiator) {
    console.log(`  ⚡️:${PORT}:on:connection-closed`, initiator, host, port);
  }
});

sw.on('peer', (peer) => {
  const { host, port, channel } = peer;

  // const peerKey = `${peer.host}:${peer.port}`;
  log(` ⚡️:${PORT}:on:peer`, host, port);
});

sw.join(C.NAME, null, () => {
  log('onfirst', Object.keys(peers));
}); // can be any id/name/hash

sw.listen(PORT);
