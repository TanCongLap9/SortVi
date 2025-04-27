import { Dispatch, SetStateAction, RefObject } from 'react';
import { OptionAction, OptionsState } from './option';
import { StepAction, StepState } from './step';
import BarGraph from '../BarGraph';
import { Post, PostSync } from './post';

export interface CodeInputProps {
  options: [OptionsState, Dispatch<OptionAction>];
}

export interface OptionsModalProps {
  options: [OptionsState, Dispatch<OptionAction>];
}

export interface ActionButtonsProps {
  steps: [StepState, Dispatch<StepAction>];
  arrays: [Array<BarGraph>, Dispatch<SetStateAction<Array<BarGraph>>>];
  options: [OptionsState, Dispatch<OptionAction>];
  post: [Post, PostSync];
}

export interface GlobalsProps {
  arrays: [Array<BarGraph>, Dispatch<SetStateAction<Array<BarGraph>>>];
  steps: [StepState, Dispatch<StepAction>];
  post: [Post, PostSync];
}

export interface GraphProps {
  post: [Post, PostSync];
  options: [OptionsState];
  arrays: [Array<BarGraph>];
  steps: [StepState, Dispatch<StepAction>];
  graphDisplay: RefObject<{
    postMessage: Post;
    postMessageSync: PostSync;
  }> | null;
}
