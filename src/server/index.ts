import { WebSocketServer } from 'ws';
import router from './router';
import { sendJson } from './utils/sendJson';
import { ExtendedWebSocket } from './types/websocket';

export type WsRequestData<T = object | string> = {
  id: number;
  type: string;
  data: T;
};

export type WsResponseData = {
  id: number;
  type: string;
  data: string;
};

export function startWebSocketServer(port: number = 3000) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (ws) => {
    const extendsWs = ws as ExtendedWebSocket;

    ws.on('error', console.error);

    ws.on('message', async (message) => {
      let parsed: WsRequestData;

      try {
        parsed = JSON.parse(message.toString());
      } catch (err) {
        console.error('Failed to parse JSON:', message.toString());
        sendJson(ws, 'error', 'Invalid JSON');
        return;
      }

      const { type, data } = parsed;

      const handler = router[type];
      if (!handler) {
        console.log(data);
        console.error(`Unknown command type: ${type}`);
        sendJson(ws, 'error', `Unknown command: ${type}`);
        return;
      }

      try {
        const parsedData = data !== '' ? JSON.parse(data.toString()) : data;
        await handler(parsedData, extendsWs, wss);
      } catch (err) {
        console.error('Handler execution failed:', err);
        sendJson(ws, 'error', 'Handler failed');
      }
    });
  });

  console.log(`[WS] WebSocket server is running on ws://localhost:${port}`);
}
