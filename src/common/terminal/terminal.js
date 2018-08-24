import color from 'bash-color';
import { Terminal } from 'xterm';
import * as fit from 'xterm/lib/addons/fit/fit';
import xtermStyle from 'xterm/dist/xterm.css'; // eslint-disable-line

import { C } from 'common';
import runCommand from './runCommand';
import style from './terminal.css'; // eslint-disable-line

const ENV = JSON.parse(document.getElementById('environment').innerHTML);
const { ID, INSTANCE, PORT } = ENV;
const BASH = `${color.wrap(`${ID || INSTANCE}:${PORT}`, 'green', 'bold')} ${color.wrap('$', 'white', 'bold')} `;
const { NAME, TERMINAL: { HELP, WELCOME } } = C;

Terminal.applyAddon(fit);
const term = new Terminal({ cursorBlink: true, scrollback: 1000, tabStopWidth: 2 });
let resizedFinished;
let command = '';

term.on('key', async (key) => {
  const keyCode = key.charCodeAt(0);

  if (keyCode === 13) { // Return
    term.write(key);

    term.writeln('');
    try {
      const { data, method } = await runCommand(INSTANCE, command);
      if (method) term[method]();
      if (data) term.writeln(data);
    } catch (error) {
      term.writeln(`error: ${error}`);
    }

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
