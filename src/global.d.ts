import { BarGraph } from './BarGraph';

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

  namespace jest {
    interface Matchers<R> {
      toBeSorted(decreasing?: boolean): R;
    }
  }
}
