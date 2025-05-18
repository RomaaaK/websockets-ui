export type AttackData = {
  gameId: number | string;
  x: number;
  y: number;
  indexPlayer: number | string;
};

export type AttackResponse = {
  position: { x: number; y: number };
  currentPlayer: number | string;
  status: 'miss' | 'shot' | 'killed';
};
