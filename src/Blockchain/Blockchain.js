import Block from 'Block';

import Store from './Store';
import isValidChain from './isValidChain';

export default class Blockchain {
  constructor({ file = 'blockchain', keyChain = 'coin', difficulty = 1 } = {}) {
    this.file = file;
    this.keyChain = keyChain;
    this.difficulty = difficulty;

    const { store, chain } = new Store(this);
    this.store = store;
    this.chain = chain;
  }

  addBlock(data = {}) {
    const { difficulty, keyChain, store } = this;
    const { hash: previousHash } = this.latestBlock;
    const newBlock = new Block({ data, previousHash, difficulty });

    store
      .get(keyChain)
      .push(newBlock)
      .write();

    return newBlock;
  }

  get latestBlock() {
    return this.chain[this.chain.length - 1];
  }
}
