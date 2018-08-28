import { C } from 'common';
import { Block } from '../../Blockchain';
import send from './modules/send';

const { SOCKET: { MESSAGE: { BLOCK_MINED } } } = C;

export default (data) => {
  const newBlock = new Block(Object.assign({}, data, { mine: true }));

  if (newBlock) send({ type: BLOCK_MINED, data: newBlock });
  else console.error(); // @TODO
};
