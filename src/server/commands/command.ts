export interface Command<T = unknown, R = unknown> {
  execute(data: T): Promise<R>;
}

export default Command;
