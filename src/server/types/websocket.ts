import { WebSocket } from 'ws';
import { PlayerInfo } from './playerTypes';

export interface ExtendedWebSocket extends WebSocket {
  player?: PlayerInfo;
}
