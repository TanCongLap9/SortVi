import { Dispatch } from "react";
import { StepAction, StepActionType } from "./types/step";

export default class BarGraph extends Array {
  _graph: number;
  _array: Array<number>;

  constructor(
    graph: number,
    dispatchSteps: Dispatch<[action: StepAction]>,
    array: Array<number>
  ) {
    if (array === undefined) {
      array = [];
    } else if (!Array.isArray(array)) {
      throw new TypeError("The provided argument is not an array");
    }

    super(...array);

    this._graph = graph;
    this._array = array;
    Object.defineProperties(this, {
      _graph: { value: graph, enumerable: false, configurable: true },
      _array: { value: array, enumerable: false, configurable: true },
    });

    for (const i in array) {
      Object.defineProperty(this, i, {
        get() {
          return this._array[i];
        },
        set(value) {
          this._array[i] = value;

          dispatchSteps({
            type: StepActionType.PUSH,
            payload: {
              type: "set",
              graph: this._graph,
              index: Number(i),
              value: value,
              oldValue: this[i],
              reversed: false,
            },
          });
        },
        configurable: true,
        enumerable: true,
      });
    }
  }
  override slice(start: number, end: number) {
    return this._array.slice(start, end);
  }
}
