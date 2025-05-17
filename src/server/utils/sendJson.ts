import { WebSocket } from 'ws';

export function sendJson(ws: WebSocket, type: string, data: object | string) {
  const parsedData = typeof data === 'string' ? data : JSON.stringify(data);

  const responce = {
    type,
    data: parsedData,
    id: 0,
  };
  ws.send(JSON.stringify(responce));
}
