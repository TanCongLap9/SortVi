import { OptionsState } from '../../types/option';
import { Shuffles } from '../../types/shuffle';
import { Generates } from '../generate';
import { shuffle } from '../shuffle';

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

describe('shuffle()', () => {
  const sampleArray = [2.2, 7.1, -3.0, 2.2, 5.1, 1.2, -7.1, 3.5];
  const randomArray = Array.from(
    { length: 20 },
    () => (Math.random() - 0.5) * 256
  );
  let sample: Array<number> = [];
  let random: Array<number> = [];
  const reload = () => {
    sample = sampleArray.slice();
    random = randomArray.slice();
  };
  beforeEach(reload);
  it('does with Ascending preset', () => {
    // 1 part
    shuffle(sample, { ...options, shuffleAlgo: Shuffles.ASC, segments: 1 });
    shuffle(random, { ...options, shuffleAlgo: Shuffles.ASC, segments: 1 });
    expect(sample).toBeSorted();
    expect(random).toBeSorted();

    reload();
    // 2 parts
    shuffle(sample, { ...options, shuffleAlgo: Shuffles.ASC, segments: 2 });
    shuffle(random, { ...options, shuffleAlgo: Shuffles.ASC, segments: 2 });
    expect(sample.slice(0, 4)).toBeSorted();
    expect(sample.slice(4, 8)).toBeSorted();
    expect(random.slice(0, 10)).toBeSorted();
    expect(random.slice(10, 20)).toBeSorted();
  });
  it('does with Descending preset', () => {
    // 1 part
    shuffle(sample, { ...options, shuffleAlgo: Shuffles.DESC, segments: 1 });
    shuffle(random, { ...options, shuffleAlgo: Shuffles.DESC, segments: 1 });
    expect(sample).toBeSorted(true);
    expect(random).toBeSorted(true);

    reload();
    // 2 parts
    shuffle(sample, { ...options, shuffleAlgo: Shuffles.DESC, segments: 2 });
    shuffle(random, { ...options, shuffleAlgo: Shuffles.DESC, segments: 2 });
    expect(sample.slice(0, 4)).toBeSorted(true);
    expect(sample.slice(4, 8)).toBeSorted(true);
    expect(random.slice(0, 10)).toBeSorted(true);
    expect(random.slice(10, 20)).toBeSorted(true);
  });
  it('does with Mountain preset', () => {
    // 1 part
    shuffle(sample, {
      ...options,
      shuffleAlgo: Shuffles.ASC_DESC,
      segments: 1,
    });
    shuffle(random, {
      ...options,
      shuffleAlgo: Shuffles.ASC_DESC,
      segments: 1,
    });
    expect(sample.slice(0, 4)).toBeSorted();
    expect(sample.slice(4, 8)).toBeSorted(true);
    expect(random.slice(0, 10)).toBeSorted();
    expect(random.slice(10, 20)).toBeSorted(true);

    reload();
    // 2 parts
    shuffle(sample, {
      ...options,
      shuffleAlgo: Shuffles.ASC_DESC,
      segments: 2,
    });
    shuffle(random, {
      ...options,
      shuffleAlgo: Shuffles.ASC_DESC,
      segments: 2,
    });
    expect(sample.slice(0, 2)).toBeSorted();
    expect(sample.slice(2, 4)).toBeSorted(true);
    expect(sample.slice(4, 6)).toBeSorted();
    expect(sample.slice(6, 8)).toBeSorted(true);
    expect(random.slice(0, 5)).toBeSorted();
    expect(random.slice(5, 10)).toBeSorted(true);
    expect(random.slice(10, 15)).toBeSorted();
    expect(random.slice(15, 20)).toBeSorted(true);
  });
  it('does with Trench preset', () => {
    // 1 part
    shuffle(sample, {
      ...options,
      shuffleAlgo: Shuffles.DESC_ASC,
      segments: 1,
    });
    shuffle(random, {
      ...options,
      shuffleAlgo: Shuffles.DESC_ASC,
      segments: 1,
    });
    expect(sample.slice(0, 4)).toBeSorted(true);
    expect(sample.slice(4, 8)).toBeSorted();
    expect(random.slice(0, 10)).toBeSorted(true);
    expect(random.slice(10, 20)).toBeSorted();

    reload();
    // 2 parts
    shuffle(sample, {
      ...options,
      shuffleAlgo: Shuffles.DESC_ASC,
      segments: 2,
    });
    shuffle(random, {
      ...options,
      shuffleAlgo: Shuffles.DESC_ASC,
      segments: 2,
    });
    expect(sample.slice(0, 2)).toBeSorted(true);
    expect(sample.slice(2, 4)).toBeSorted();
    expect(sample.slice(4, 6)).toBeSorted(true);
    expect(sample.slice(6, 8)).toBeSorted();
    expect(random.slice(0, 5)).toBeSorted(true);
    expect(random.slice(5, 10)).toBeSorted();
    expect(random.slice(10, 15)).toBeSorted(true);
    expect(random.slice(15, 20)).toBeSorted();
  });
  it('does with Scrambled head preset', () => {
    // 5 elements
    shuffle(sample, {
      ...options,
      shuffleAlgo: Shuffles.SCRAMBLED_HEAD,
      amount: 5,
      unit: 'element',
    });
    shuffle(random, {
      ...options,
      shuffleAlgo: Shuffles.SCRAMBLED_HEAD,
      amount: 5,
      unit: 'element',
    });
    expect(sample.slice(5, 8)).toBeSorted();
    expect(random.slice(5, 20)).toBeSorted();

    reload();
    // 50%
    shuffle(sample, {
      ...options,
      shuffleAlgo: Shuffles.SCRAMBLED_HEAD,
      amount: 50,
      unit: 'percent',
    });
    shuffle(random, {
      ...options,
      shuffleAlgo: Shuffles.SCRAMBLED_HEAD,
      amount: 50,
      unit: 'percent',
    });
    expect(sample.slice(4, 8)).toBeSorted();
    expect(random.slice(10, 20)).toBeSorted();
  });
  it('does with Scrambled tail preset', () => {
    // 5 elements
    shuffle(sample, {
      ...options,
      shuffleAlgo: Shuffles.SCRAMBLED_TAIL,
      amount: 5,
      unit: 'element',
    });
    shuffle(random, {
      ...options,
      shuffleAlgo: Shuffles.SCRAMBLED_TAIL,
      amount: 5,
      unit: 'element',
    });
    expect(sample.slice(0, 3)).toBeSorted();
    expect(random.slice(0, 15)).toBeSorted();

    reload();
    // 50%
    shuffle(sample, {
      ...options,
      shuffleAlgo: Shuffles.SCRAMBLED_TAIL,
      amount: 50,
      unit: 'percent',
    });
    shuffle(random, {
      ...options,
      shuffleAlgo: Shuffles.SCRAMBLED_TAIL,
      amount: 50,
      unit: 'percent',
    });
    expect(sample.slice(0, 4)).toBeSorted();
    expect(random.slice(0, 10)).toBeSorted();
  });
});
