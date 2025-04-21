import { Generates } from "../shuffle/generate";
import { Shuffles } from "../shuffle/shuffle";

export enum OptionActionType {
  IS_SHOWN = "isShown",
  OPTIONS = "options",
  CREATION_ALGO = "creationAlgo",
  SHUFFLE_ALGO = "shuffleAlgo",
  PATTERN = "pattern",
  SPEED = "speed",
  EACH = "each",
  UNIT = "unit",
  AMOUNT = "amount",
  SEGMENTS = "segments",
  DECIMAL = "decimal",
  MIN = "min",
  MAX = "max",
  CODE = "code",
  IS_DIRTY_CODE = "isDirtyCode",
  LENGTH = "length",
  RESET = "reset",
  DEFAULT = "default",
}

export type OptionAction =
  | { type: OptionActionType.IS_SHOWN; payload: boolean }
  | { type: OptionActionType.CREATION_ALGO; payload: string }
  | { type: OptionActionType.SHUFFLE_ALGO; payload: string }
  | { type: OptionActionType.PATTERN; payload: Array<number> }
  | { type: OptionActionType.SPEED; payload: number }
  | { type: OptionActionType.EACH; payload: number }
  | { type: OptionActionType.UNIT; payload: string }
  | { type: OptionActionType.AMOUNT; payload: number }
  | { type: OptionActionType.SEGMENTS; payload: number }
  | { type: OptionActionType.DECIMAL; payload: boolean }
  | { type: OptionActionType.MIN; payload: number }
  | { type: OptionActionType.MAX; payload: number }
  | { type: OptionActionType.CODE; payload: string }
  | { type: OptionActionType.IS_DIRTY_CODE; payload: boolean }
  | { type: OptionActionType.LENGTH; payload: number }
  | { type: OptionActionType.RESET }
  | { type: OptionActionType.DEFAULT };

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
