export enum OptionActionType {
  IS_SHOWN = 'isShown',
  OPTIONS = 'options',
  CREATION_ALGO = 'creationAlgo',
  SHUFFLE_ALGO = 'shuffleAlgo',
  PATTERN = 'pattern',
  SPEED = 'speed',
  EACH = 'each',
  UNIT = 'unit',
  AMOUNT = 'amount',
  SEGMENTS = 'segments',
  DECIMAL = 'decimal',
  MIN = 'min',
  MAX = 'max',
  CODE = 'code',
  IS_DIRTY_CODE = 'isDirtyCode',
  LENGTH = 'length',
  RESET = 'reset',
  DEFAULT = 'default',
}

export type OptionAction =
  | { type: OptionActionType.IS_SHOWN; payload: boolean }
  | {
      type: OptionActionType.CREATION_ALGO;
      payload: string;
      localStorage: Storage;
    }
  | {
      type: OptionActionType.SHUFFLE_ALGO;
      payload: string;
      localStorage: Storage;
    }
  | {
      type: OptionActionType.PATTERN;
      payload: Array<number>;
      localStorage: Storage;
    }
  | { type: OptionActionType.SPEED; payload: number; localStorage: Storage }
  | { type: OptionActionType.EACH; payload: number; localStorage: Storage }
  | { type: OptionActionType.UNIT; payload: string; localStorage: Storage }
  | { type: OptionActionType.AMOUNT; payload: number; localStorage: Storage }
  | { type: OptionActionType.SEGMENTS; payload: number; localStorage: Storage }
  | { type: OptionActionType.DECIMAL; payload: boolean; localStorage: Storage }
  | { type: OptionActionType.MIN; payload: number; localStorage: Storage }
  | { type: OptionActionType.MAX; payload: number; localStorage: Storage }
  | { type: OptionActionType.CODE; payload: string; localStorage: Storage }
  | { type: OptionActionType.IS_DIRTY_CODE; payload: boolean }
  | { type: OptionActionType.LENGTH; payload: number; localStorage: Storage }
  | { type: OptionActionType.RESET; localStorage: Storage }
  | { type: OptionActionType.DEFAULT; localStorage: Storage };

export interface OptionsState {
  [OptionActionType.SPEED]: number;
  [OptionActionType.LENGTH]: number;
  [OptionActionType.EACH]: number;
  [OptionActionType.SEGMENTS]: number;
  [OptionActionType.MIN]: number;
  [OptionActionType.IS_SHOWN]: boolean;
  [OptionActionType.MAX]: number;
  [OptionActionType.DECIMAL]: boolean;
  [OptionActionType.AMOUNT]: number;
  [OptionActionType.UNIT]: string;
  [OptionActionType.CODE]: string;
  [OptionActionType.PATTERN]: Array<number>;
  [OptionActionType.CREATION_ALGO]: string;
  [OptionActionType.IS_DIRTY_CODE]: boolean;
  [OptionActionType.SHUFFLE_ALGO]: string;
}
