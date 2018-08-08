import { Block } from 'Blockchain';
import cache from './cache';

export default ({
  file, keyChain, data = {}, previousHash, mine = false,
}) => {
  const blockchain = cache({ file, keyChain });
  const { difficulty, latestBlock: { hash } } = blockchain;
  let newBlock;

  if (previousHash === hash) {
    newBlock = mine
      ? new Block({ data, difficulty, previousHash })
      : blockchain.addBlock({ data });
  }

  return newBlock;
};
