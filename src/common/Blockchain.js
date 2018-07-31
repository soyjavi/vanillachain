import Block, { calculateHash } from './Block';

const isValidChain = (chain = []) => {
  for (let i = 1; i < chain.length; i += 1) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];

    if (currentBlock.hash !== calculateHash(currentBlock)) return false;
    if (currentBlock.previousHash !== previousBlock.hash) return false;
    if (currentBlock.index - 1 !== previousBlock.index) return false;
  }

  return true;
};

export default class Blockchain {
  constructor({ chain = [], difficulty = 2 } = {}) {
    this.chain = chain.length > 0
      ? chain
      : [new Block({ data: 'Genesis Block', difficulty, index: 0 })];
    this.difficulty = difficulty;
  }

  addBlock(data = {}) {
    const { difficulty } = this;
    const { hash, index } = this.getLatestBlock();

    this.chain.push(
      new Block({
        data,
        index: index + 1,
        previousHash: hash,

        difficulty,
      }),
    );
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
}

export { isValidChain };
