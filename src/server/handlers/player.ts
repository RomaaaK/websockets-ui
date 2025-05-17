import { broadcast } from '../utils/broadcast';
import { sendJson } from '../utils/sendJson';
import { WebSocket, WebSocketServer } from 'ws';

class PlayerHandler {
  public async reg(
    _data: unknown,
    ws: WebSocket,
    wss: WebSocketServer,
  ): Promise<void> {
    const data = {
      name: 'Romaaa',
      index: 1,
      error: false,
      errorText: '',
    };

    sendJson(ws, 'reg', data);

    broadcast(wss, 'update_room', []);
    broadcast(wss, 'update_winners', []);
  }
}

export default new PlayerHandler();
