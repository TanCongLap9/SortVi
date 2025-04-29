export const shufflePart = (
  array: Array<number>,
  start: number,
  end: number
) => {
  for (let i = start; i < end; i++) {
    let randomIndex = Math.floor(i + Math.random() * (end - i));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
};

export const partition = (
  array: Array<number>,
  first: number,
  last: number,
  decreasing: boolean
) => {
  let pivotIndex = first,
    pivot = array[pivotIndex],
    lower = first;

  for (let higher = lower; higher <= last; higher++) {
    if (!decreasing ? array[higher] < pivot : array[higher] > pivot) {
      lower++;
      [array[lower], array[higher]] = [array[higher], array[lower]];
    }
  }

  [array[lower], array[pivotIndex]] = [array[pivotIndex], array[lower]];
  return lower;
};

/**
 * Sorts the array
 */
export const sort = (
  array: Array<number>,
  first: number = 0,
  last: number = array.length - 1,
  decreasing: boolean = false
) => {
  if (first >= last) return;
  const sortedElemIndex = partition(array, first, last, decreasing);
  sort(array, first, sortedElemIndex - 1, decreasing);
  sort(array, sortedElemIndex + 1, last, decreasing);
};

/**
 * Checks if the array is sorted ascendingly (default) or descendingly
 */
export const isSorted = (array: Array<number>, decreasing: boolean = false) => {
  return (
    !!array.length &&
    array.every(
      (_, i) =>
        !i ||
        (!decreasing ? array[i - 1] <= array[i] : array[i - 1] >= array[i])
    )
  );
};

/**
 * Swaps elements pair in the array
 */
export const swap = (array: Array<number>, a: number, b: number) => {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
};

/**
 * Reverses a consecutive range of elements in the array
 */
export const reverse = (
  array: Array<number>,
  start: number = 0,
  end: number = array.length
) => {
  for (let i = start; i < start + (end - start) / 2; i++) {
    swap(array, i, start + end - i - 1);
  }
};
