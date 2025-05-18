import { ExtendedWebSocket } from '../types/websocket';
import { WebSocketServer } from 'ws';
import { sendJson } from '../utils/sendJson';
import gameService from '../services/gameService';
import { Ship } from '../types/shipTypes';

type AddShipsPayload = {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
};

class GameHandler {
  public async addShips(
    data: unknown,
    _ws: ExtendedWebSocket,
    wss: WebSocketServer,
  ): Promise<void> {
    const { gameId, ships, indexPlayer } = data as AddShipsPayload;

    const readyToStart = gameService.addShips(gameId, indexPlayer, ships);

    if (readyToStart) {
      const players = Array.from(wss.clients).filter(
        (client) =>
          (client as ExtendedWebSocket).player &&
          [0, 1].includes(
            (client as ExtendedWebSocket).player!.index as number,
          ),
      ) as ExtendedWebSocket[];

      players.forEach((client) => {
        const playerIndex = client.player!.index as number;
        const playerShips = gameService.getShips(gameId, playerIndex);

        sendJson(client, 'start_game', {
          ships: playerShips,
          currentPlayerIndex: playerIndex,
        });
      });

      players.forEach((ws) => {
        sendJson(ws, 'turn', { currentPlayer: 0 });
      });
    }
  }
}

export default new GameHandler();
