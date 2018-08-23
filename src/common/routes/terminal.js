import fs from 'fs';
import path from 'path';

import { C } from 'common';
const { ID, INSTANCE, PORT } = process.env;

export default (req, res) => {
  const filePath = path.resolve(__dirname, '..', '..', '..', 'public', 'index.html');

  fs.readFile(filePath, 'utf8', (error, html) => {
    if (error) res.status(400).json({ error: 'NaiveChain not found.' });

    html = html.replace('{{title}}', C.NAME);
    html = html.replace('{{environment}}', JSON.stringify({ ID, INSTANCE, PORT }));
    res.send(html);
  });
}
