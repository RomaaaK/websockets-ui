export type RoomUser = {
  name: string;
  index: number | string;
};

export type Room = {
  roomId: number | string;
  roomUsers: RoomUser[];
};

export const rooms: Room[] = [];
export const nextRoomId = 1;
