import { extend } from 'jquery';
import { Generates } from '../../shuffle/generate';
import { OptionActionType, OptionsState } from '../../types/option';
import { Shuffles } from '../../types/shuffle';
import { getDefaultOptions, optionsReducer } from '../OptionsReducer';
import { localStorage } from '../../setupTests';

describe('optionsReducer()', () => {
  const getOptionsLS = () => {
    const optionsLS = localStorage.getItem(OptionActionType.OPTIONS);
    const options: OptionsState = optionsLS ? JSON.parse(optionsLS) : {};
    return options;
  };

  let options = getDefaultOptions(localStorage);

  it('sets creation algo', () => {
    options = optionsReducer(options, {
      type: OptionActionType.CREATION_ALGO,
      payload: Generates.EXP5,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.creationAlgo).toBe(Generates.EXP5);
    expect(optionsLS).toHaveProperty('creationAlgo');
    expect(optionsLS.creationAlgo).toBe(Generates.EXP5);
  });
  it('sets shuffle algo', () => {
    options = optionsReducer(options, {
      type: OptionActionType.SHUFFLE_ALGO,
      payload: Shuffles.NOISY,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.shuffleAlgo).toBe(Shuffles.NOISY);
    expect(optionsLS).toHaveProperty('shuffleAlgo');
    expect(optionsLS.shuffleAlgo).toBe(Shuffles.NOISY);
  });
  it('sets segments', () => {
    options = optionsReducer(options, {
      type: OptionActionType.SEGMENTS,
      payload: 10,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.segments).toBe(10);
    expect(optionsLS).toHaveProperty('segments');
    expect(optionsLS.segments).toBe(10);
  });
  it('sets amount', () => {
    options = optionsReducer(options, {
      type: OptionActionType.AMOUNT,
      payload: 20,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.amount).toBe(20);
    expect(optionsLS).toHaveProperty('amount');
    expect(optionsLS.amount).toBe(20);
  });
  it('sets speed', () => {
    options = optionsReducer(options, {
      type: OptionActionType.SPEED,
      payload: 1000,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.speed).toBe(1000);
    expect(optionsLS).toHaveProperty('speed');
    expect(optionsLS.speed).toBe(1000);
  });
  it('sets segments', () => {
    options = optionsReducer(options, {
      type: OptionActionType.SEGMENTS,
      payload: 10,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.segments).toBe(10);
    expect(optionsLS).toHaveProperty('segments');
    expect(optionsLS.segments).toBe(10);
  });
  it('sets dirty code', () => {
    options = optionsReducer(options, {
      type: OptionActionType.IS_DIRTY_CODE,
      payload: true,
    });
    const optionsLS = getOptionsLS();
    expect(options.isDirtyCode).toBe(true);
    expect(optionsLS).not.toHaveProperty('isDirtyCode');
  });
  it('sets code', () => {
    options = optionsReducer(options, {
      type: OptionActionType.CODE,
      payload: 'it works!',
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.code).toBe('it works!');
    expect(optionsLS).toHaveProperty('code');
    expect(optionsLS.code).toBe('it works!');
  });
  it('sets decimal', () => {
    options = optionsReducer(options, {
      type: OptionActionType.DECIMAL,
      payload: true,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.decimal).toBe(true);
    expect(optionsLS).toHaveProperty('decimal');
    expect(optionsLS.decimal).toBe(true);
  });
  it('sets length', () => {
    options = optionsReducer(options, {
      type: OptionActionType.LENGTH,
      payload: 21,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.length).toBe(21);
    expect(optionsLS).toHaveProperty('length');
    expect(optionsLS.length).toBe(21);
  });
  it('sets max', () => {
    options = optionsReducer(options, {
      type: OptionActionType.MAX,
      payload: 189,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.max).toBe(189);
    expect(optionsLS).toHaveProperty('max');
    expect(optionsLS.max).toBe(189);
  });
  it('sets min', () => {
    options = optionsReducer(options, {
      type: OptionActionType.MIN,
      payload: 17,
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.min).toBe(17);
    expect(optionsLS).toHaveProperty('min');
    expect(optionsLS.min).toBe(17);
  });
  it('sets unit', () => {
    options = optionsReducer(options, {
      type: OptionActionType.UNIT,
      payload: 'percent',
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.unit).toBe('percent');
    expect(optionsLS).toHaveProperty('unit');
    expect(optionsLS.unit).toBe('percent');
  });
  it('sets pattern', () => {
    options = optionsReducer(options, {
      type: OptionActionType.PATTERN,
      payload: [2, 5, 6],
      localStorage,
    });
    const optionsLS = getOptionsLS();
    expect(options.pattern).toEqual([2, 5, 6]);
    expect(optionsLS).toHaveProperty('pattern');
    expect(optionsLS.pattern).toEqual([2, 5, 6]);
  });
});
