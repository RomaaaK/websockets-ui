import { broadcast } from '../utils/broadcast';
import { WebSocket, WebSocketServer } from 'ws';

class RoomHandler {
  public async createRoom(
    _data: unknown,
    _ws: WebSocket,
    wss: WebSocketServer,
  ): Promise<void> {
    const newRoom = {
      roomId: 1,
      roomUsers: [
        {
          name: 'Player',
          index: 1,
        },
      ],
    };

    const data = [];
    data.push(newRoom);

    broadcast(wss, 'update_room', data);
  }
}

export default new RoomHandler();
