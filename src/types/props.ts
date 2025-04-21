import { ActionDispatch, Dispatch, SetStateAction, RefObject } from "react";
import { OptionAction, OptionState } from "../option";
import { StepAction, StepState } from "../step";
import BarGraph from "../BarGraph";
import { Post, PostSync } from "./post";

export interface CodeInputProps {
  options: [OptionState, ActionDispatch<[action: OptionAction]>];
}

export interface OptionsModalProps {
  options: [OptionState, ActionDispatch<[action: OptionAction]>];
}

export interface ActionButtonsProps {
  steps: [StepState, ActionDispatch<[action: StepAction]>];
  arrays: [Array<BarGraph>, Dispatch<SetStateAction<Array<BarGraph>>>];
  options: [OptionState, ActionDispatch<[action: OptionAction]>];
  post: [Post, PostSync];
}

export interface GlobalsProps {
  arrays: [Array<BarGraph>, Dispatch<SetStateAction<Array<BarGraph>>>];
  steps: [StepState, ActionDispatch<[action: StepAction]>];
  post: [Post, PostSync];
}

export interface GraphProps {
  post: [Post, PostSync];
  options: [OptionState];
  arrays: [Array<BarGraph>];
  steps: [StepState, ActionDispatch<[action: StepAction]>];
  graphDisplay: RefObject<{
    postMessage: Post;
    postMessageSync: PostSync;
  }> | null;
}
