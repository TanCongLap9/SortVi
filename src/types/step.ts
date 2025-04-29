export enum StepActionType {
  PUSH = 'push',
  GO = 'go',
  GO_OK = 'go-ok',
  CLEAR = 'clear',
  MARK = 'mark',
  NEXT = 'next',
  PLAY = 'play',
  PLAY_FIRST = 'play-first',
  STOP = 'stop',
  DEFAULT = 'default',
}

export type StepAction =
  | { type: StepActionType.PUSH; payload: GraphAction }
  | { type: StepActionType.GO; payload: number }
  | { type: StepActionType.GO_OK }
  | { type: StepActionType.CLEAR }
  | { type: StepActionType.MARK }
  | { type: StepActionType.NEXT }
  | { type: StepActionType.PLAY }
  | { type: StepActionType.PLAY_FIRST }
  | { type: StepActionType.STOP }
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
      reversed?: boolean;
    }
  | {
      type: GraphActionType.NEW;
      arrays: Array<Array<number>>;
      reversed?: boolean;
    }
  | {
      type: GraphActionType.SET;
      graph: number;
      index: number;
      value: number;
      oldValue: number;
      reversed?: boolean;
    }
  | {
      type: GraphActionType.SWAP;
      graph: number;
      from: number;
      to: number;
      reversed?: boolean;
    }
  | { type: GraphActionType.CLEAR; graph: number; reversed?: boolean }
  | { type: GraphActionType.SPEED; value: number; reversed?: boolean }
  | {
      type: GraphActionType.INITIAL;
      oldArrays: Array<Array<number>>;
      reversed?: boolean;
    };
