import { GraphAction } from './step';

export type Post = (step: GraphAction) => Promise<void>;
export type PostSync = (step: GraphAction) => void;
