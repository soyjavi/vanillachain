import Hypernode from 'hypernode';
import ip from 'ip';

import { C } from 'common';

const peers = {};
const {
  DNS, DNS_PORT, INSTANCE, PORT, NODE_PORT, NODE_INSTANCE,
} = process.env;
const { log } = console;
// Create a bootnode.
const keypair = {
  public: '-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----',
  private: '-----BEGIN RSA PRIVATE KEY----- ... -----END RSA PRIVATE KEY-----',
};

const props = { port: NODE_PORT };

if (NODE_INSTANCE !== 'network') {
  props.initialPeers = [{ address: '192.168.100.4', port: 3000 }];
}
const node = new Hypernode(props);

node.on('listening', () => {
  log('peer:listening', `${ip.address()}:${NODE_PORT} as ${node.id}`);
});
node.on('peer:discovery', (peer) => {
  log('peer:discovery', peer.id);
});
node.on('peer:connect', (peer) => {
  if (peer.broker) {
    log('peer:connect', peer.id, `(through relay: ${peer.broker.id})`);
  } else {
    log('peer:connect', peer.id);
  }

  node.getPeerCount();
});
node.on('message', (data = {}, peer) => {
  console.log(`boot got message '${data.message}' (${data.timestamp}) from ${peer.id}`);
});
node.on('peer:disconnect', (peer) => {
  log('peer:disconnect', peer.id);
});

if (NODE_INSTANCE !== 'network') {
  node.relay({ message: 'relay()', timestamp: new Date() });
}
