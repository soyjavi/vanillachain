import { Block } from 'Blockchain';
import cache from './cache';

export default ({
  file, keyChain, data = {}, previousHash, mine = false,
}) => {
  const blockchain = cache({ file, keyChain });
  const { latestBlock: { hash } } = blockchain;
  let newBlock;

  if (previousHash === hash) {
    if (!mine) newBlock = blockchain.addBlock({ data });
    else {
      newBlock = Block({ data });
      newBlock.mine();
    }
  }

  return newBlock;
};
