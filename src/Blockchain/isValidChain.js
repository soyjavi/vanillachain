export default (chain = []) => {
  for (let i = 1; i < chain.length; i += 1) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];

    if (currentBlock.previousHash !== previousBlock.hash) return false;
  }

  return true;
};
