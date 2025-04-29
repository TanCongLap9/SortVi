import { StepActionType } from '../../types/step';
import { getDefaultSteps, stepsReducer } from '../StepsReducer';

describe('stepsReducer() next', () => {
  let options = getDefaultSteps();

  it('when playing and not at end, goes to next step', () => {
    options = stepsReducer(options, {
      type: StepActionType.NEXT,
    });
  });
});

describe('stepsReducer()', () => {
  it('next', () => {
    let options = getDefaultSteps();

    options = stepsReducer(options, {
      type: StepActionType.NEXT,
    });
  });
});
