import { PrintAction } from '../../types/output';
import { outputReducer } from '../OutputReducer';

describe('outputReducer()', () => {
  let output: PrintAction[] = [];
  it('logs', () => {
    output = outputReducer(output, { type: 'log', payload: 'it works!' });
    expect(output[output.length - 1]).toEqual({
      type: 'log',
      payload: 'it works!',
    });
    output = outputReducer(output, { type: 'log', payload: 'it also works!' });
    expect(output[output.length - 1]).toEqual({
      type: 'log',
      payload: 'it also works!',
    });
    output = outputReducer(output, {
      type: 'log',
      payload: 'it also also works!',
    });
    expect(output[output.length - 1]).toEqual({
      type: 'log',
      payload: 'it also also works!',
    });
  });
  it('warns', () => {
    output = outputReducer(output, { type: 'warn', payload: 'it works!' });
    expect(output[output.length - 1]).toEqual({
      type: 'warn',
      payload: 'it works!',
    });
    output = outputReducer(output, { type: 'warn', payload: 'it also works!' });
    expect(output[output.length - 1]).toEqual({
      type: 'warn',
      payload: 'it also works!',
    });
    output = outputReducer(output, {
      type: 'warn',
      payload: 'it also also works!',
    });
    expect(output[output.length - 1]).toEqual({
      type: 'warn',
      payload: 'it also also works!',
    });
  });
  it('debugs', () => {
    output = outputReducer(output, { type: 'debug', payload: 'it works!' });
    expect(output[output.length - 1]).toEqual({
      type: 'debug',
      payload: 'it works!',
    });
    output = outputReducer(output, {
      type: 'debug',
      payload: 'it also works!',
    });
    expect(output[output.length - 1]).toEqual({
      type: 'debug',
      payload: 'it also works!',
    });
    output = outputReducer(output, {
      type: 'debug',
      payload: 'it also also works!',
    });
    expect(output[output.length - 1]).toEqual({
      type: 'debug',
      payload: 'it also also works!',
    });
  });
  it('infos', () => {
    output = outputReducer(output, { type: 'info', payload: 'it works!' });
    expect(output[output.length - 1]).toEqual({
      type: 'info',
      payload: 'it works!',
    });
    output = outputReducer(output, {
      type: 'info',
      payload: 'it also works!',
    });
    expect(output[output.length - 1]).toEqual({
      type: 'info',
      payload: 'it also works!',
    });
    output = outputReducer(output, {
      type: 'info',
      payload: 'it also also works!',
    });
    expect(output[output.length - 1]).toEqual({
      type: 'info',
      payload: 'it also also works!',
    });
  });
  it('errors', () => {
    output = outputReducer(output, { type: 'error', payload: 'it works!' });
    expect(output[output.length - 1]).toEqual({
      type: 'error',
      payload: 'it works!',
    });
    output = outputReducer(output, {
      type: 'error',
      payload: 'it also works!',
    });
    expect(output[output.length - 1]).toEqual({
      type: 'error',
      payload: 'it also works!',
    });
    output = outputReducer(output, {
      type: 'error',
      payload: 'it also also works!',
    });
    expect(output[output.length - 1]).toEqual({
      type: 'error',
      payload: 'it also also works!',
    });
  });
  it('clears', () => {
    output = outputReducer(output, {
      type: 'clear',
    });
    expect(output).toHaveLength(0);
  });
});
