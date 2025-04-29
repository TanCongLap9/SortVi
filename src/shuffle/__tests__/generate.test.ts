import { OptionsState } from '../../types/option';
import { Shuffles } from '../../types/shuffle';
import { generate, Generates, newArray, toPureArrays } from '../generate';

const options: OptionsState = {
  min: 0,
  max: 100,
  decimal: true,
  length: 20,
  amount: 5,
  each: 5,
  isDirtyCode: true,
  isShown: false,
  segments: 5,
  pattern: [1, 2, 3],
  creationAlgo: Generates.UNIQUE,
  speed: 500,
  unit: 'element',
  code: '',
  shuffleAlgo: Shuffles.UNCHANGED,
};

describe('generate()', () => {
  it('does with Unique preset', () => {
    const array = generate({ ...options, creationAlgo: Generates.UNIQUE });
    expect([...new Set(array)]).toHaveLength(array.length);
  });
  it('does with Steps preset', () => {
    const array = generate({
      ...options,
      creationAlgo: Generates.EACH,
      each: 6,
    });
    expect([...new Set(array)]).toHaveLength(6);
  });
  it('does with Few unique preset', () => {
    const array = generate({
      ...options,
      creationAlgo: Generates.NEARLY_SAME,
    });
    expect(array).toContain(options.min);
    expect(array).toContain(options.max);
    expect(
      array.filter((v) => v === (options.max + options.min) / 2)
    ).toHaveLength(array.length - 2);
  });
  it('does with No unique preset', () => {
    const array = generate({
      ...options,
      creationAlgo: Generates.SAME,
    });
    expect(array.every((v) => v === (options.max + options.min) / 2));
  });
});

describe('toPureArrays()', () => {
  it('converts Array<BarGraph> to Array<Array<number>>', () => {
    const barGraphs = newArray(options, jest.fn());
    expect(toPureArrays(barGraphs)[0]).not.toHaveProperty('_array');
  });
});
