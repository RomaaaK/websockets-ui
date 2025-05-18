import { ExtendedWebSocket } from '../types/websocket';
import roomService from '../services/roomService';
import { broadcast } from '../utils/broadcast';
import { WebSocketServer } from 'ws';
import { sendJson } from '../utils/sendJson';

class RoomHandler {
  private gameIdCounter = 0;
  public async createRoom(
    _data: unknown,
    ws: ExtendedWebSocket,
    wss: WebSocketServer,
  ): Promise<void> {
    await roomService.createRoom(ws.player!);

    broadcast(wss, 'update_room', await roomService.getAwaitRoom());
  }

  public async addUserToRoom(
    data: unknown,
    ws: ExtendedWebSocket,
    wss: WebSocketServer,
  ): Promise<void> {
    const dataRes = data as { indexRoom: number };
    await roomService.addUserToRoom(dataRes.indexRoom, ws.player!);

    const room = await roomService.getRoomById(dataRes.indexRoom);
    if (room && room.roomUsers.length === 2) {
      const playerSockets = Array.from(wss.clients).filter(
        (client) =>
          (client as ExtendedWebSocket).player &&
          room.roomUsers.some(
            (u) => u.name === (client as ExtendedWebSocket).player!.name,
          ),
      ) as ExtendedWebSocket[];

      this.startGameForRoomPlayers(playerSockets);
    }

    broadcast(wss, 'update_room', await roomService.getAwaitRoom());
  }

  private startGameForRoomPlayers(players: ExtendedWebSocket[]): void {
    const idGame = this.gameIdCounter++;

    players.forEach((ws, index) => {
      const data = {
        idGame,
        idPlayer: index,
      };

      sendJson(ws, 'create_game', data);
    });
  }
}

export default new RoomHandler();
