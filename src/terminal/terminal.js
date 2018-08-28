import Terminal from 'vanilla-terminal';

import { C } from 'common';
import commands from './commands';
import style from './terminal.css'; // eslint-disable-line

const ENV = JSON.parse(document.getElementById('environment').innerHTML);
const { ID, INSTANCE, PORT = 3000 } = ENV;
const { TERMINAL: { WELCOME } } = C;

const terminal = new Terminal({
  commands: commands(INSTANCE),
  welcome: WELCOME,
  prompt: `<u>${ID || INSTANCE}:${PORT}</u> `,
  separator: '$',
});

terminal.onInput(value => console.log(value));
