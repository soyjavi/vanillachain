import WebSocket from 'ws';

export default (data = {}) => {
  const { wss } = global;

  if (!wss) return;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(data));
  });
};
