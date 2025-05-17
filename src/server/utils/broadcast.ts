import { WebSocket, WebSocketServer } from 'ws';

export function broadcast(
  wss: WebSocketServer,
  type: string,
  message: object | [],
) {
  const data = {
    type,
    data: JSON.stringify(message),
    id: 0,
  };

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
