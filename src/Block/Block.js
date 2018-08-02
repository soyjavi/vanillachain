import calculateHash from './calculateHash';

export default class Block {
  constructor({
    data = {}, difficulty, previousHash,
  } = {}) {
    this.data = data;
    this.nonce = 0;
    this.previousHash = previousHash;
    this.timestamp = new Date();

    if (difficulty) this.mine(difficulty);
  }

  mine(difficulty = 0) {
    this.hash = calculateHash(this);
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce += 1;
      this.hash = calculateHash(this);
    }
  }
}

export { calculateHash };
