import WebSocket from 'ws';

export default (socket, data = {}) => {
  socket.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(data);
  });
};
