export enum StepActionType {
  PUSH = 'push',
  GO = 'go',
  GO_OK = 'go-ok',
  CLEAR = 'clear',
  MARK = 'mark',
  NEXT = 'next',
  PREV = 'prev',
  PLAY = 'play',
  PLAY_FIRST = 'play-first',
  STOP = 'stop',
  STOP_FIRST = 'stop-first',
  STOP_LAST = 'stop-last',
  DEFAULT = 'default',
}

export type StepAction =
  | { type: StepActionType.PUSH; payload: GraphAction }
  | { type: StepActionType.GO; payload: number }
  | { type: StepActionType.GO_OK }
  | { type: StepActionType.CLEAR }
  | { type: StepActionType.MARK }
  | { type: StepActionType.NEXT }
  | { type: StepActionType.PREV }
  | { type: StepActionType.PLAY }
  | { type: StepActionType.PLAY_FIRST }
  | { type: StepActionType.STOP }
  | { type: StepActionType.STOP_FIRST }
  | { type: StepActionType.STOP_LAST }
  | { type: StepActionType.DEFAULT };

export interface StepState {
  steps: Array<GraphAction>;
  current: number;
  playing: boolean;
  from: number | undefined;
  marks: Array<number>;
}

export enum GraphActionType {
  HIGHLIGHT = 'highlight',
  NEW = 'new',
  SET = 'set',
  SWAP = 'swap',
  CLEAR = 'clear',
  SPEED = 'speed',
  INITIAL = 'initial',
}

export type GraphAction =
  | {
      type: GraphActionType.HIGHLIGHT;
      indices: { [k: number]: Array<number> };
      colors: { [k: number]: Array<string> };
    }
  | { type: GraphActionType.NEW; arrays: Array<Array<number>> }
  | {
      type: GraphActionType.SET;
      graph: number;
      index: number;
      value: number;
      oldValue: number;
      reversed: boolean;
    }
  | { type: GraphActionType.SWAP; graph: number; from: number; to: number }
  | { type: GraphActionType.CLEAR; graph: number }
  | { type: GraphActionType.SPEED; value: number }
  | {
      type: GraphActionType.INITIAL;
      reversed: boolean;
      oldArrays: Array<Array<number>>;
    };
