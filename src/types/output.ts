export type PrintAction = {
  type: 'log' | 'info' | 'debug' | 'warn' | 'error';
  payload: string;
};
export type ClearAction = { type: 'clear' };

export type OutputAction = PrintAction | ClearAction;
