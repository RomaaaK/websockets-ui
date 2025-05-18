import { Room } from '../types/roomTypes';
import { PlayerInfo } from '../types/playerTypes';

class RoomService {
  private roomList: Room[] = [];
  private roomCounter = 0;

  public async getAwaitRoom(): Promise<Room[]> {
    const rums = this.roomList.filter((r) => r.roomUsers.length === 1);
    return rums;
  }

  public async createRoom(player: PlayerInfo): Promise<void> {
    const newRoom = {
      roomId: this.roomCounter++,
      roomUsers: [player],
    };

    this.roomList.push(newRoom);
  }

  public async addUserToRoom(
    roomId: number,
    player: PlayerInfo,
  ): Promise<void> {
    this.roomList[roomId]?.roomUsers.push(player);
  }

  public async getRoomById(id: number): Promise<Room> {
    return this.roomList[id]!;
  }
}

export default new RoomService();
