export type Player = {
  name: string;
  password: string;
};

export type PlayerInfo = {
  name: string;
  index: string | number;
};

export type ResponsePlayer = {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
};
