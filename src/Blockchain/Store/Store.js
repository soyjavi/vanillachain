import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import fs from 'fs';

import Block from '../Block'; // @TODO: Decouple

export default ({
  difficulty, file, keyChain, readMode,
}) => {
  const folder = path.resolve('.', 'store');
  if (!fs.existsSync(folder) && !readMode) fs.mkdirSync(folder);

  // -- We should test if the file exists
  const storeFile = `${folder}/${file}.json`;
  if (!fs.existsSync(storeFile) && readMode) return {};

  const store = low(new FileSync(storeFile));
  if (!store.has(keyChain).value() && !readMode) {
    store
      .set(keyChain, [new Block({ data: 'Genesis Block', difficulty, index: 0 })])
      .write();
  }

  return {
    store,
    chain: store.get(keyChain).value(),
  };
};
