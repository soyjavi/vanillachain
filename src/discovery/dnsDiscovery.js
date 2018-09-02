import discovery from 'dns-discovery';
import { C } from 'common';

const peers = {};
const { log } = console;
const {
  DNS, DNS_PORT, INSTANCE, PORT,
} = process.env;
const props = {
  // server: 'discovery.example.com:9090', // put a centralized dns discovery server here
  // ttl: someSeconds, // ttl for records in seconds. defaults to Infinity.
  // limit: 0, // max number of records stored. defaults to 10000.
  multicast: true, // use multicast-dns. defaults to true.
  // domain: DNS, // top-level domain to use for records. defaults to dns-discovery.local
  // socket: someUdpSocket, // use this udp socket as the client socket
  loopback: false, // discover yourself over multicast
};

const onPeer = (name, peer = {}) => {
  const peerKey = `${peer.host}:${peer.port}`;
  if (!peers[peerKey] && peer.host !== '127.0.0.1') {
    peers[peerKey] = peer;
    log(' ⚡️ on.peer', peer);
  }
};
let node;

if (INSTANCE === 'dns') {
  const dns = discovery(props);
  dns.listen(PORT, () => log(`🍦:${INSTANCE}:${PORT}`));
  dns.on('peer', onPeer);
  dns.on('error', () => log(' ⚡️ on.error'));
  dns.on('close', (name, port) => log(' ⚡️ on.close', name, port));
  dns.on('listening', () => log(' ⚡️ on.listening'));
  // dns.on('announced', () => log(' ⚡️ on.announced'));
  dns.on('unannounced', () => log(' ⚡️ on.unannounced'));
  // dns.on('traffic', (type, details) => log(' ⚡️ on.traffic', type));
} else {
  setTimeout(() => {
    const server = DNS_PORT ? `${DNS}:${DNS_PORT}` : DNS;
    log(`🍦:${INSTANCE}:${PORT} connecting to dns:${server}...`);
    props.server = [server];

    node = discovery(props);
    node.on('peer', onPeer);
    node.on('error', () => log(' ⚡️ on.error'));
    node.on('close', (name, port) => log(' ⚡️ on.close', name, port));
    node.on('unannounced', (name, port) => log(' ⚡️ on.unannounced', name, port));
    // node.on('announced', (name, port) => log(' ⚡️ on.announced', name, port));
    // node.on('traffic', (type, details) => log(' ⚡️ on.traffic', type));

    node.announce(C.NAME, PORT, [{ hello: 'world' }]);
  }, 1000);
}

process.on('SIGTERM', () => process.exit());

process.on('SIGINT', () => {
  if (node) {
    node.unannounce(C.NAME, PORT, [], () => {
      node.destroy();
      process.exit();
    });
  }
});

process.on('exit', () => log(' ⚡️ on.exit'));
