import { Player } from '../types/playerTypes';
import playerService from '../services/playerService';
import { broadcast } from '../utils/broadcast';
import { sendJson } from '../utils/sendJson';
import { WebSocketServer } from 'ws';
import { ExtendedWebSocket } from '../types/websocket';
import roomService from '../services/roomService';

class PlayerHandler {
  public async reg(
    data: unknown,
    ws: ExtendedWebSocket,
    wss: WebSocketServer,
  ): Promise<void> {
    const player = await playerService.registration(data as Player);

    if (player.error === false) {
      ws.player = { index: player.index, name: player.name };
    }

    sendJson(ws, 'reg', player);

    broadcast(wss, 'update_room', await roomService.getAwaitRoom());
    broadcast(wss, 'update_winners', []);
  }
}

export default new PlayerHandler();
