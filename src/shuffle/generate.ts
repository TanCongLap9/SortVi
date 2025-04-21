import { OptionActionType, OptionsState } from "../types/option";
import BarGraph from "../BarGraph";
import shuffle from "./shuffle";

export enum Generates {
  UNIQUE = "unique",
  EACH = "each",
  NEARLY_SAME = "nearly_same",
  SAME = "same",
  RANDOM = "random",
  EXP2 = "exp-2",
  EXP3 = "exp-3",
  EXP4 = "exp-4",
  EXP5 = "exp-5",
  EXP1_2 = "exp-1-2",
  EXP1_3 = "exp-1-3",
  EXP1_4 = "exp-1-4",
  EXP1_5 = "exp-1-5",
  PATTERN = "pattern",
  SIN = "sin",
  COS = "cos",
  TAN = "tan",
  CSC = "csc",
  SEC = "sec",
  COT = "cot",
}

function height(i: number, last: number, options: OptionsState) {
  const { creationAlgo, pattern, each, min, max, decimal } = options;
  const dist = max - min;
  let ratio, linearRatio, perc;

  switch (creationAlgo) {
    case Generates.UNIQUE:
      ratio = i / last;
      break;
    case Generates.EACH:
      perc = 1 / (each - 1);
      linearRatio = i / last;
      ratio = Math.min(Math.floor((linearRatio * (1 + perc)) / perc) * perc, 1);
      break;
    case Generates.EXP2:
      ratio = Math.pow(i / last, 2);
      break;
    case Generates.EXP3:
      ratio = Math.pow(i / last, 3);
      break;
    case Generates.EXP4:
      ratio = Math.pow(i / last, 4);
      break;
    case Generates.EXP5:
      ratio = Math.pow(i / last, 5);
      break;
    case Generates.EXP1_2:
      ratio = Math.sqrt(i / last);
      break;
    case Generates.EXP1_3:
      ratio = Math.cbrt(i / last);
      break;
    case Generates.EXP1_4:
      ratio = Math.pow(i / last, 0.25);
      break;
    case Generates.EXP1_5:
      ratio = Math.pow(i / last, 0.2);
      break;
    case Generates.RANDOM:
      ratio = Math.random() * (1 / (last + 1)) + i / (last + 1);
      break;
    case Generates.SIN:
      ratio = 0.5 + Math.sin((i / last) * 2 * Math.PI) * 0.5;
      break;
    case Generates.COS:
      ratio = 0.5 + Math.cos((i / last) * 2 * Math.PI) * 0.5;
      break;
    case Generates.TAN:
      ratio =
        0.5 +
        (Math.clamp(Math.tan((i / last) * 2 * Math.PI), -10, 10) * 0.5) / 10;

      break;
    case Generates.CSC:
      ratio =
        0.5 +
        (Math.clamp(1 / Math.sin((i / last) * 2 * Math.PI), -10, 10) * 0.5) /
          10;

      break;
    case Generates.SEC:
      ratio =
        0.5 +
        (Math.clamp(1 / Math.cos((i / last) * 2 * Math.PI), -10, 10) * 0.5) /
          10;

      break;
    case Generates.COT:
      ratio =
        0.5 +
        (Math.clamp(1 / Math.tan((i / last) * 2 * Math.PI), -10, 10) * 0.5) /
          10;

      break;
    case Generates.PATTERN:
      return pattern[i % pattern.length];
    case Generates.NEARLY_SAME:
      ratio = i === 0 ? 0 : i === last ? 1 : 0.5;
      break;
    case Generates.SAME:
      ratio = 0.5;
      break;
    default:
      throw new RangeError(`Invalid algorithm: ${creationAlgo}`);
  }

  return decimal ? min + ratio * dist : Math.round(min + ratio * dist);
}

/**
 * @param {number} length
 * @param {object} options
 * @param {Generates} options.name Algorithm name
 * @param {string} options.pattern Algorithm pattern
 * @param {number} options.min Min value
 * @param {number} options.max Max value
 * @param {boolean} options.decimal Use decimal value
 */
const generate = (options) => {
  return Array.from({ length: options[OptionActionType.LENGTH] }, (_, i) =>
    height(i, options[OptionActionType.LENGTH] - 1, options)
  );
};

export const toPureArrays = (barGraph: BarGraph) =>
  barGraph.map((array) => array._array.slice());

export const newArray = (options, dispatchSteps) => {
  const array = generate(options);
  shuffle(array, options);
  return [new BarGraph(0, dispatchSteps, array)];
};

export default generate;
