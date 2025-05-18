import { Player, ResponsePlayer } from '../types/playerTypes';

class PlayerService {
  private userList: Player[] = [];

  public async registration(player: Player): Promise<ResponsePlayer> {
    if (this.userList.find((p) => p.name === player.name)) {
      return {
        name: '',
        index: '',
        error: true,
        errorText: 'Login is taken',
      };
    }

    this.userList.push(player);

    const index = this.userList.length - 1;

    return {
      name: player.name,
      index,
      error: false,
      errorText: '',
    };
  }
}

export default new PlayerService();
