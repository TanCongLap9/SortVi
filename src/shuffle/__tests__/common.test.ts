import { reverse, sort, swap } from '../common';

describe('swap()', () => {
  const sampleArray = [2, 4, 6, 8];
  let array: Array<number> = [];
  beforeEach(() => {
    array = sampleArray.slice();
  });
  it('works for 2 different indices', () => {
    swap(array, 1, 2);
    swap(array, 3, 0);
    expect(array).toEqual([8, 6, 4, 2]);
  });
  it('works for 2 same indices', () => {
    swap(array, 1, 1);
    swap(array, 2, 2);
    expect(array).toEqual([2, 4, 6, 8]);
  });
});

describe('reverse()', () => {
  const sampleArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let array: Array<number> = [];
  beforeEach(() => {
    array = sampleArray.slice();
  });
  it('works for entire array (no indices parameters)', () => {
    reverse(array);
    expect(array).toEqual(sampleArray.slice().reverse());
  });
  it('works for slices', () => {
    reverse(array, 2, 6);
    expect(array).toEqual([0, 1, 5, 4, 3, 2, 6, 7, 8, 9]);
  });
});

describe('isSorted()', () => {
  it('returns true for ascending/descending array', () => {
    expect([1, 3.2, 3.2, 6.5, 6.7, 9]).toBeSorted();
    expect([8, 3.2, 3.2, 2.5, 2.2, -5, -5, -6.5]).toBeSorted(true);
  });
  it('returns false for unsorted array', () => {
    expect([1, 2.2, 1.2, 2.5, 4.7, 9]).not.toBeSorted();
    expect([8, 3.2, 3.1, 2.5, 2.2, -5, -5, -6.5]).not.toBeSorted();
  });
  it('returns false for empty array', () => {
    expect([]).not.toBeSorted();
  });
});

describe('sort()', () => {
  const sampleArray = [3, 6.4, 5, 7.1, 6.3, -3, -5.3, -0.7, -5.2, -6, -2.3];
  const randomArray = Array.from(
    { length: 20 },
    () => (Math.random() - 0.5) * 256
  );
  let sample: Array<number> = [];
  let random: Array<number> = [];
  beforeEach(() => {
    sample = sampleArray.slice();
    random = randomArray.slice();
  });
  it('sorts ascendingly', () => {
    sort(sample);
    sort(random);
    expect(sample).toBeSorted();
    expect(random).toBeSorted();
  });
  it('sorts descendingly', () => {
    sort(sample, 0, sample.length - 1, true);
    sort(random, 0, random.length - 1, true);
    expect(sample).toBeSorted(true);
    expect(random).toBeSorted(true);
  });
  it('works for empty array', () => {
    const empty: number[] = [];
    sort(empty);
    expect(empty).toHaveLength(0);
  });
});
