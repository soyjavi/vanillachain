import color  from 'bash-color';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import xtermStyle from 'xterm/dist/xterm.css'; // eslint-disable-line

import { C } from 'common';
import style from './terminal.css'; // eslint-disable-line

const { NAME, TERMINAL: { HELP, WELCOME } } = C;
const { ID, INSTANCE, PORT } = JSON.parse(document.getElementById('environment').innerHTML);
const BASH = `${color.wrap(`${ID || INSTANCE}:${PORT}`, 'green', 'bold')} ${color.wrap('$', 'white', 'bold')} `;

Terminal.applyAddon(fit);
const term = new Terminal({ cursorBlink: true, scrollback: 1000, tabStopWidth: 2 });
let resizedFinished;
let command = '';

term.on('key', (key) => {
  const keyCode = key.charCodeAt(0);

  if (keyCode === 13) { // Return
    term.write(key);
    term.writeln(`\nerror: ${color.wrap(command, 'white', 'underline')} command not found\n`);
    term.write(BASH);
    command = '';
  } else if (keyCode !== 127) { // Backspace
    term.write(key);
    command += key;
  }
});

term.on('open', () => {
  console.log('>>>');
  window.addEventListener('resize', () => {
    clearTimeout(resizedFinished);
    resizedFinished = setTimeout(term.fit, 250);
  });

  term.fit();
});

term.open();
term.fit();
term.writeln(WELCOME);
term.writeln(HELP);
term.writeln('');
term.write(BASH);
term.focus();

document.title = `${INSTANCE} ${ID}:${PORT}`;
