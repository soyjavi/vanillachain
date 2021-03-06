import fs from 'fs';
import path from 'path';

import { C } from 'common';

const { ID, INSTANCE, PORT } = process.env;

export default (req, res) => {
  const filePath = path.resolve(__dirname, '..', '..', '..', 'public', 'index.html');

  fs.readFile(filePath, 'utf8', (error, html) => {
    if (error) res.status(400).json({ error: 'VanillaChain not found.' });

    res.send(html
      .replace('{{title}}', C.NAME)
      .replace('{{environment}}', JSON.stringify({ ID, INSTANCE, PORT })));
  });
};
