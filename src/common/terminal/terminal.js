import VanillaTerminal from 'vanilla-terminal';

import { C } from 'common';
// import runCommand from './runCommand';
import style from './terminal.css'; // eslint-disable-line

const ENV = JSON.parse(document.getElementById('environment').innerHTML);
const { ID, INSTANCE, PORT } = ENV;
const { TERMINAL: { HELP, WELCOME } } = C;

const terminal = new VanillaTerminal({
  welcome: WELCOME,
  prompt: `${ID || INSTANCE}:${PORT} `,
  separator: '$',
});

terminal.onInput(value => console.log(value));
