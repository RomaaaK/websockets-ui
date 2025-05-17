import { WebSocket, WebSocketServer } from 'ws';
import player from './handlers/player';
import room from './handlers/room';

type Handler = (
  data: unknown,
  ws: WebSocket,
  wss: WebSocketServer,
) => Promise<void>;

const router: Record<string, Handler> = {
  reg: player.reg,
  create_room: room.createRoom,
};

export default router;
