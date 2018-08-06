import Blockchain from 'Blockchain';

global.cache = {};

export default ({ file = 'NaiveChain', keyChain = 'demo' }) => {
  const key = `${file}:${keyChain}`;

  let blockchain = global.cache[key];
  if (!blockchain) {
    blockchain = new Blockchain({ file, keyChain });
    global.cache[key] = blockchain;
  }

  return blockchain;
};
