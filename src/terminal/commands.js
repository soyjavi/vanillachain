const service = (method, endpoint) => new Promise((resolve, reject) => {
  fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    method,
  })
    .then(async (response) => {
      resolve(JSON.stringify(await response.json()));
    })
    .catch(() => reject('Error connection')); //eslint-disable-line
});

const COMMANDS = {
  network: {
    peers: async terminal => terminal.output(await service('GET', '/peers')),
  },
  peer: {
  },
};

export default instance => COMMANDS[instance];
