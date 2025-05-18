import { Ship } from '../types/shipTypes';
import { ExtendedWebSocket } from '../types/websocket';
import { WebSocketServer } from 'ws';

type GameSession = {
  players: {
    [index: number]: {
      ships?: Ship[];
      name?: string;
    };
  };
  currentPlayer?: number;
};

class GameService {
  private games: Map<number, GameSession> = new Map();

  public addShips(
    gameId: number,
    indexPlayer: number,
    ships: Ship[],
    name?: string,
  ): boolean {
    if (!this.games.has(gameId)) {
      this.games.set(gameId, { players: {} });
    }

    const game = this.games.get(gameId)!;
    game.players[indexPlayer] = {
      ships,
      name,
    };

    return (
      Object.keys(game.players).length === 2 &&
      Object.values(game.players).every((p) => p.ships)
    );
  }

  public getShips(gameId: number, indexPlayer: number): Ship[] | undefined {
    return this.games.get(gameId)?.players[indexPlayer]?.ships;
  }

  public getGameById(gameId: number): GameSession | undefined {
    return this.games.get(gameId);
  }
}

export default new GameService();
