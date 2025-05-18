import { PlayerInfo } from './playerTypes';

export type Room = {
  roomId: number | string;
  roomUsers: PlayerInfo[];
};
