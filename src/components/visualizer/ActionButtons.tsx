import { useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { newArray, toPureArrays } from '../../shuffle/generate';
import { OptionActionType } from '../../types/option';
import { GraphActionType, StepActionType } from '../../types/step';
import { AppContext } from './App';

const evalGlobal = eval;

export const ActionButtons = () => {
  const { steps, dispatchSteps, arrays, setArrays, options, setOptions, post } =
    useContext(AppContext);

  const create = () => {
    const arrays = newArray(options, dispatchSteps);
    setArrays(arrays);
    setOptions({ type: OptionActionType.IS_DIRTY_CODE, payload: true });
    post({ type: GraphActionType.NEW, arrays: toPureArrays(arrays) });
  };

  const start = () => {
    if (options[OptionActionType.IS_DIRTY_CODE]) {
      dispatchSteps({ type: StepActionType.DEFAULT });

      dispatchSteps({
        type: StepActionType.PUSH,
        payload: {
          type: GraphActionType.INITIAL,
          oldArrays: toPureArrays(arrays),
          reversed: false,
        },
      });

      const match = options[OptionActionType.CODE].match(/^\s*#!(\w+)\n(.*)/s);
      let mainFunc = '';

      try {
        if (match) {
          mainFunc = match[1];
        } else {
          throw new TypeError(
            'Missing main func (specify it at first line, starting with #!).'
          );
        }
        evalGlobal(
          `(() => {\n${match[2]}\nmo_auxArrays(0);\n${mainFunc}(arrays[0]);\n})();`
        );
        setOptions({ type: OptionActionType.IS_DIRTY_CODE, payload: false });
        dispatchSteps({ type: StepActionType.PLAY_FIRST });
      } catch (e) {
        console.error(e);
      }
    } else {
      dispatchSteps({ type: StepActionType.PLAY });
    }
  };

  const stop = () => {
    dispatchSteps({ type: StepActionType.STOP });
  };

  return (
    <ButtonGroup>
      {steps.playing ? (
        <Button variant="danger" onClick={stop}>
          STOP
        </Button>
      ) : (
        <Button variant="success" onClick={start}>
          START
        </Button>
      )}
      <Button variant="primary" onClick={create} disabled={steps.playing}>
        NEW
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          setOptions({
            type: OptionActionType.IS_SHOWN,
            payload: true,
          })
        }>
        OPTIONS
      </Button>
    </ButtonGroup>
  );
};
