import { WebSocketServer } from 'ws';
import commandHandlers from './handlers/commandHandlers';

export type WsRequestData<T = object | string> = {
  id: number;
  type: string;
  data: T;
};

export function startWebSocketServer(port: number = 3000) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', async (message) => {
      const parsed = JSON.parse(message.toString());
      const handler = commandHandlers[parsed.type];
      console.log(parsed.type);

      if (handler) {
        handler(parsed.data, ws);
      } else {
        ws.send(
          JSON.stringify({
            type: 'error',
            data: { message: 'Unknown command' },
            id: 0,
          }),
        );
      }
    });
  });

  console.log(`[WS] WebSocket server is running on ws://localhost:${port}`);
}
