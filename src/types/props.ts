import { Dispatch, RefObject } from 'react';
import { OptionAction, OptionsState } from './option';
import { Post, PostSync } from './post';

export interface GraphProps {
  graphDisplay: RefObject<{
    postMessage: Post;
    postMessageSync: PostSync;
  }> | null;
}

export interface OptionsModalProps {
  options: OptionsState;
  setOptions: Dispatch<OptionAction>;
}
