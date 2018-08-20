import Block from './Block';
import Store from './Store';

export default class Blockchain {
  constructor({
    difficulty = 1, file = 'blockchain', keyChain = 'coin', readMode,
  } = {}) {
    this.file = file;
    this.keyChain = keyChain;
    this.difficulty = difficulty;
    this.readMode = readMode;

    const { store, chain = [] } = new Store(this);
    this.store = store;
    this.chain = chain;
  }

  addBlock(data = {}, previousHash) {
    const {
      difficulty, keyChain, latestBlock, readMode, store,
    } = this;

    if (readMode) return Error(`The NaiveChain:${keyChain} is in read mode only.`);
    // @TODO: Shield blocks
    const newBlock = new Block({ data, previousHash: latestBlock.hash, difficulty });
    store.get(keyChain).push(newBlock).write();

    return newBlock;
  }

  get latestBlock() {
    return this.chain[this.chain.length - 1];
  }
}
