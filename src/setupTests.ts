import { isSorted } from './shuffle/common';

expect.extend({
  toBeSorted(received: Array<number>, decreasing: boolean = false) {
    return {
      pass: isSorted(received, decreasing),
      message: () => 'array is not sorted',
    };
  },
});

const LocalStorageMock = (): Storage => {
  let entries: Record<string, string> = {};
  let length = 0;
  return {
    get length() {
      return length;
    },
    getItem(key: string) {
      return entries[key] || null;
    },
    setItem(key: string, value: string) {
      if (!entries.hasOwnProperty(key)) length++;
      entries[key] = value;
    },
    clear() {
      entries = {};
    },
    removeItem(key: string) {
      delete entries[key];
    },
    key(index: number) {
      return '';
    },
  };
};

export const localStorage = LocalStorageMock();
