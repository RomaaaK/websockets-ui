import { WebSocket } from 'ws';

type CommandHandler = (data: object | string, ws: WebSocket) => void;

const commandHandlers: Record<string, CommandHandler> = {};

export default commandHandlers;
