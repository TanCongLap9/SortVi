import { useContext, useEffect } from 'react';
import { toPureArrays } from '../../shuffle/generate';
import { OptionActionType } from '../../types/option';
import { GraphProps } from '../../types/props';
import { GraphActionType, StepActionType } from '../../types/step';
import { AppContext } from './App';
import { GraphDisplay } from './GraphDisplay';

export const Graph = ({ graphDisplay }: GraphProps) => {
  const { post, postSync, options, arrays, steps, dispatchSteps } =
    useContext(AppContext);

  useEffect(() => {
    post({
      type: GraphActionType.SPEED,
      value: options[OptionActionType.SPEED],
    });
  }, [options[OptionActionType.SPEED]]);

  useEffect(() => {
    if (!graphDisplay!.current) return;
    post({ type: GraphActionType.NEW, arrays: toPureArrays(arrays) });
    post({
      type: GraphActionType.SPEED,
      value: options[OptionActionType.SPEED],
    });
  }, []);

  useEffect(() => {
    if (!steps.playing) return;

    if (steps.current >= steps.steps.length) {
      dispatchSteps({ type: StepActionType.GO, payload: 0 });
      return;
    }

    post(steps.steps[steps.current]).then(() => {
      if (steps.current < steps.steps.length - 1) {
        dispatchSteps({ type: StepActionType.NEXT });
      } else {
        dispatchSteps({ type: StepActionType.STOP });
      }
    });
  }, [steps.current, steps.playing]);

  useEffect(() => {
    if (steps.from === undefined) return;

    if (steps.from > steps.current) {
      for (let i = steps.from; i >= steps.current + 1; i--) {
        let step = steps.steps[i];
        postSync({ ...step, reversed: true });
      }
    } else {
      for (let i = steps.from + 1; i <= steps.current; i++) {
        let step = steps.steps[i];
        postSync(step);
      }
    }

    dispatchSteps({ type: StepActionType.GO_OK });
  }, [steps.from]);

  return <GraphDisplay ref={graphDisplay} />;
};
