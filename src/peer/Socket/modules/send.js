export default (message) => {
  global.ws.send(JSON.stringify(message), (error) => {
    console.error('ws.send [error]', error);
  });
};
