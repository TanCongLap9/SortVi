import { StepAction, StepActionType, StepState } from '../types/step';

export const stepsReducer = (
  state: StepState,
  action: StepAction
): StepState => {
  switch (action.type) {
    case StepActionType.PUSH:
      return { ...state, steps: [...state.steps, action.payload] };
    case StepActionType.GO:
      return { ...state, current: action.payload, from: state.current };
    case StepActionType.GO_OK:
      return { ...state, from: undefined };
    case StepActionType.CLEAR:
      return { ...state, steps: [] };
    case StepActionType.MARK:
      return { ...state, marks: [...state.marks, state.steps.length] };
    case StepActionType.NEXT:
      if (state.playing) {
        return { ...state, current: state.current + 1 };
      }

      return state;
    case StepActionType.PLAY:
      return { ...state, playing: true, current: state.current + 1 };
    case StepActionType.PLAY_FIRST:
      return { ...state, playing: true, current: 0 };
    case StepActionType.STOP:
      return { ...state, playing: false };
    case StepActionType.DEFAULT:
      return getDefaultSteps();
  }
};

export const getDefaultSteps = () =>
  ({
    steps: [],
    current: 0,
    playing: false,
    from: undefined,
    marks: [],
  } as StepState);
