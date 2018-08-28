import Terminal from 'vanilla-terminal';

import { C } from 'common';
import commands from './commands';
import style from './terminal.css'; // eslint-disable-line

const ENV = JSON.parse(document.getElementById('environment').innerHTML);
const { ID, INSTANCE, PORT } = ENV;
const { NAME, TERMINAL: { WELCOME } } = C;

const terminal = new Terminal({
  commands: commands(INSTANCE),
  welcome: WELCOME,
  prompt: `${NAME} @ <u>${ID || INSTANCE}:${PORT}</u> `,
  separator: '$',
});

terminal.onInput(value => console.log(value));
