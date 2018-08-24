import color from 'bash-color';

const COMMANDS = {
  network: {
    broadcast: { method: 'GET', endpoint: 'peers/broadcast', arguments: 2 },
    info: { method: 'GET', arguments: 0 },
    peers: { method: 'GET', arguments: 0 },
    clear: { arguments: 0 },
  },
  peer: {
    info: {},
    clear: { arguments: 0 },
  },
};

export default async (instance, queryCommand = '') => new Promise((resolve, reject) => {
  const [query, ...parameters] = queryCommand.toLowerCase().split(' ');

  const command = COMMANDS[instance][query];
  if (!command) reject(`${color.wrap(query, 'white', 'underline')} command not found`); // eslint-disable-line

  if (command.method) {
    fetch(`/${command.endpoint || query}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: command.method,
    }) // @TODO: headers and parameters
      .then(async (response) => {
        // const json = ;
        resolve({ data: JSON.stringify(await response.json()) });
      })
      .catch(() => {
        reject('Error connection'); // eslint-disable-line
      });
  } else {
    resolve({ method: query });
  }
});
