import { WebSocketServer, WebSocket } from 'ws';
import commands from './commands/commandRegistry';

type CommandsMap = typeof commands;

export type WsRequestData<T = object | string> = {
  id: number;
  type: keyof CommandsMap;
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
    ws.on('error', console.error);

    ws.on('message', async (message) => {
      const parsed: WsRequestData = JSON.parse(message.toString());
      const command = commands[parsed.type];

      if (!command) {
        ws.send(
          JSON.stringify({
            id: parsed.id,
            type: 'error',
            data: { message: 'Unknown command' },
          }),
        );
        return;
      }

      const inputData = JSON.parse(parsed.data.toString());

      const result = await command.execute(inputData);

      sendResponse(ws, parsed.id, parsed.type, result);
    });
  });

  console.log(`[WS] WebSocket server is running on ws://localhost:${port}`);
}

function sendResponse(ws: WebSocket, id: number, type: string, data: object) {
  const response: WsResponseData = {
    id,
    type,
    data: JSON.stringify(data),
  };

  ws.send(JSON.stringify(response));
}
