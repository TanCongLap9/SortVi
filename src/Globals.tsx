import { useEffect } from "react";
import BarGraph from "./BarGraph";
import { toPureArrays } from "./shuffle/generate";
import { StepActionType } from "./types/step";
import { GlobalsProps } from "./types/props";

const Globals = ({
  arrays: [arrays, setArrays],
  steps: [, dispatchSteps],
  post: [post],
}: GlobalsProps) => {
  useEffect(() => {
    /**
     * Resets the array to 0.
     */
    window.mo_clearArray = (...arrays: Array<BarGraph>) => {
      for (let array of arrays) {
        array._array.fill(0);

        dispatchSteps({
          type: StepActionType.PUSH,
          payload: {
            type: "clear",
            graph: array._graph,
            oldArrays: toPureArrays(arrays),
          },
        });
      }
    };
  }, []);

  useEffect(() => {
    function swapABC(a: BarGraph, b: number, c: number): void {
      [a._array[b], a._array[c]] = [a._array[c], a._array[b]];

      dispatchSteps({
        type: StepActionType.PUSH,
        payload: {
          type: "swap",
          graph: a._graph,
          from: b,
          to: c,
          oldArrays: toPureArrays(arrays),
        },
      });
    }

    function swapBC(b: number, c: number): void {
      const a = arrays[0];

      [a._array[b], a._array[c]] = [a._array[c], a._array[b]];

      dispatchSteps({
        type: StepActionType.PUSH,
        payload: {
          type: "swap",
          graph: a._graph,
          from: b,
          to: c,
          oldArrays: toPureArrays(arrays),
        },
      });
    }

    /**
     * Swaps 2 elements in the array.
     */
    function swap(a: BarGraph | number, b: number, c?: number): void {
      if (typeof a === "number") {
        swapBC(a, b);
      } else if (typeof a !== "number" && c !== undefined) {
        swapABC(a, b, c);
      }
    }

    window.mo_swap = swap;
  }, [arrays]);

  useEffect(() => {
    /**
     * Allocate auxiliary arrays. Put this line on top of algorithm code.
     */
    window.mo_auxArrays = (
      n: number,
      ...sizes: Array<number>
    ): Array<BarGraph> => {
      const moreArrays = Array.from(
        { length: n },
        (_, i) =>
          new BarGraph(
            i + 1,
            dispatchSteps,
            new Array(sizes[i] ?? arrays[0].length).fill(0)
          )
      );

      const newArrays = [arrays[0], ...moreArrays];

      setArrays(newArrays);
      post({ type: "new", arrays: toPureArrays(newArrays) });
      return moreArrays;
    };
  }, [arrays]);

  useEffect(() => {
    window.arrays = arrays;
  }, [arrays]);

  useEffect(() => {
    function highlightABC(a: BarGraph, b: Array<number>, c: Array<string>) {
      let indices: { [k: number]: Array<number> } = {};
      let colors: { [k: number]: Array<string> } = {};
      let indicesArray: Array<number> = ([] as Array<number>).concat(b);
      let colorsArray: Array<string> = Array.isArray(c)
        ? c
        : new Array(indicesArray.length).fill(c);
      indices = { [a._graph]: indicesArray };
      colors = { [a._graph]: colorsArray };

      dispatchSteps({
        type: StepActionType.PUSH,
        payload: {
          type: "highlight",
          indices,
          colors,
          oldArrays: toPureArrays(arrays),
        },
      });
    }

    function highlightAB(a: Array<number>, b: Array<string>) {
      let indices: { [k: number]: Array<number> } = {};
      let colors: { [k: number]: Array<string> } = {};
      let indicesArray: Array<number> = ([] as Array<number>).concat(a);
      let colorsArray: Array<string> = Array.isArray(b)
        ? b
        : new Array(indicesArray.length).fill(b);
      indices = { 0: indicesArray };
      colors = { 0: colorsArray };

      dispatchSteps({
        type: StepActionType.PUSH,
        payload: {
          type: "highlight",
          indices,
          colors,
          oldArrays: toPureArrays(arrays),
        },
      });
    }

    function highlightA(
      a: Array<[BarGraph, Array<number> | number, Array<string> | string]>
    ) {
      let indices: { [k: number]: Array<number> } = {};
      let colors: { [k: number]: Array<string> } = {};

      for (let [{ _graph: graph }, indicesArray, colorsArray] of a) {
        indicesArray = ([] as Array<number>).concat(indicesArray);

        colorsArray = Array.isArray(colorsArray)
          ? colorsArray
          : new Array(indicesArray.length).fill(colorsArray);

        indices[graph] = indicesArray;
        colors[graph] = colorsArray;
      }

      dispatchSteps({
        type: StepActionType.PUSH,
        payload: {
          type: "highlight",
          indices,
          colors,
          oldArrays: toPureArrays(arrays),
        },
      });
    }

    /**
     * Highlights one or more bars with specific color.
     */
    function highlight(a: any, b: any, c: any) {
      if (a !== undefined && b !== undefined && c !== undefined) {
        highlightABC(a, b, c);
      } else if (a !== undefined && b !== undefined) {
        highlightAB(a, b);
      } else if (Array.isArray(a) && b === undefined) {
        highlightA(a);
      } else throw new TypeError("Invalid call signature.");
    }

    window.mo_highlight = highlight;
  }, []);

  useEffect(() => {
    /**
     * Marks the current step that will be shown in the steps slider.
     */
    window.mo_mark = function () {
      dispatchSteps({ type: "mark" });
    };
  }, []);

  return null;
};

window.RED = "bar-red";
window.GREEN = "bar-green";
window.BLUE = "bar-blue";

window.mo_range = function (start: number, stop: number, step: number) {
  let array = [];

  if (stop === undefined) {
    // 1 param (stop)
    stop = start;
    start = 0;
  }

  if (step === undefined) step = 1;

  if (step >= 0) {
    for (let i = start; i < stop; i += step) {
      array.push(i);
    }
  } else {
    for (let i = start; i > stop; i += step) {
      array.push(i);
    }
  }

  return array;
};

Math.clamp = function (
  value: number,
  min: number = -Infinity,
  max: number = Infinity
) {
  return Math.max(Math.min(value, max), min);
};

Math.log = function (oldLog: Math["log"], x: number, b: number = Math.E) {
  return b === Math.E
    ? oldLog(x)
    : b === 2
    ? Math.log2(x)
    : b === 10
    ? Math.log10(x)
    : oldLog(b) / oldLog(x);
}.bind(this, Math.log);

Math.round = function (oldRound: Math["round"], x: number, n: number = 0) {
  let a = Math.pow(10, n);
  return oldRound(x * a) / a;
}.bind(this, Math.round);

export default Globals;

declare global {
  interface Window {
    arrays: Array<BarGraph>;
    RED: string;
    GREEN: string;
    BLUE: string;
    mo_range(start: number, stop: number, step: number): Array<number>;
    mo_highlight(a: any, b: any, c: any): void;
    mo_mark(): void;
    mo_auxArrays(n: number, ...sizes: Array<number>): Array<BarGraph>;
    mo_clearArray(...arrays: Array<BarGraph>): void;
    mo_swap(a: BarGraph | number, b: number, c?: number): void;
  }
  interface Math {
    clamp: (value: number, min: number, max: number) => number;
  }
}
