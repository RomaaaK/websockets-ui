import { WebSocketServer } from 'ws';
import player from './handlers/playerHandler';
import room from './handlers/roomHandler';
import game from './handlers/gameHandler';
import { ExtendedWebSocket } from './types/websocket';

type Handler = (
  data: unknown,
  ws: ExtendedWebSocket,
  wss: WebSocketServer,
) => Promise<void>;

const router: Record<string, Handler> = {
  reg: (...args) => player.reg(...args),
  create_room: (...args) => room.createRoom(...args),
  add_user_to_room: (...args) => room.addUserToRoom(...args),
  add_ships: (...args) => game.addShips(...args),
};

export default router;
