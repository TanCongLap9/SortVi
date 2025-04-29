import { Dispatch } from 'react';
import { GraphActionType, StepAction, StepActionType } from './types/step';

export class BarGraph extends Array {
  _graph: number;
  _array: Array<number>;

  constructor(
    graph: number,
    dispatchSteps: Dispatch<StepAction>,
    array: Array<number>
  ) {
    if (array === undefined) {
      array = [];
    } else if (!Array.isArray(array)) {
      throw new TypeError('The provided argument is not an array');
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
          const oldValue = this._array[i];
          this._array[i] = value;

          dispatchSteps({
            type: StepActionType.PUSH,
            payload: {
              type: GraphActionType.SET,
              graph: this._graph,
              index: Number(i),
              value: value,
              oldValue,
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
