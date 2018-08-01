import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import fs from 'fs';

import Block from 'Block';

export default ({ difficulty, file, keyChain }) => {
  const folder = path.resolve('.', 'store');
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);

  const store = low(new FileSync(`${folder}/${file}.json`));
  if (!store.has(keyChain).value()) {
    store
      .set(keyChain, [new Block({ data: 'Genesis Block', difficulty, index: 0 })])
      .write();
  }

  return {
    store,
    chain: store.get(keyChain).value(),
  };
};
