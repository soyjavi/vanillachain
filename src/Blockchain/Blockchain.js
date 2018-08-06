import Block from './Block';
import Store from './Store';

export default class Blockchain {
  constructor({ file = 'blockchain', keyChain = 'coin', difficulty = 1 } = {}) {
    this.file = file;
    this.keyChain = keyChain;
    this.difficulty = difficulty;

    const { store, chain } = new Store(this);
    this.store = store;
    this.chain = chain;
  }

  addBlock(data = {}, previousHash) {
    const {
      difficulty, keyChain, latestBlock, store,
    } = this;

    // @TODO: Shield blocks
    const newBlock = new Block({ data, previousHash: latestBlock.hash, difficulty });
    store.get(keyChain).push(newBlock).write();

    return newBlock;
  }

  get latestBlock() {
    return this.chain[this.chain.length - 1];
  }
}
