import { SHA256 } from 'crypto-js';

const calculateHash = ({
  previousHash, timestamp, data = {}, nonce = 0,
}) => SHA256(previousHash + timestamp + JSON.stringify(data) + nonce).toString();

export default class Block {
  constructor({
    data = {}, difficulty, index = 0, previousHash = '',
  }) {
    this.data = data;
    this.index = index;
    this.nonce = 0;
    this.previousHash = previousHash.toString();
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
