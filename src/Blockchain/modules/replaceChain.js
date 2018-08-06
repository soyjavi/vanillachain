import isValidChain from './isValidChain';

export default (instance, newBlocks = []) => {
  let { chain } = instance;

  if (isValidChain(newBlocks) && newBlocks.length > chain.length) {
    chain = newBlocks;
    // @TODO: We should broadcast the new chain
  }

  return chain;
};
