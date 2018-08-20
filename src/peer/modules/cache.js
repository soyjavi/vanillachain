import Blockchain from 'Blockchain';

global.cache = {};

export default ({ file = 'NaiveChain', keyChain = 'demo', readMode = false }) => {
  const key = `${file}:${keyChain}`;

  let blockchain = global.cache[key];
  if (!blockchain) {
    blockchain = new Blockchain({ file, keyChain, readMode });
    global.cache[key] = blockchain;
  }

  return blockchain;
};
