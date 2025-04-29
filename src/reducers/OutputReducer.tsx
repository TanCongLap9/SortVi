import { OutputAction, PrintAction } from '../types/output';

export const outputReducer = (
  state: Array<PrintAction>,
  action: OutputAction
): Array<PrintAction> => {
  switch (action.type) {
    case 'log':
      return state.concat({ type: 'log', payload: action.payload });
    case 'error':
      return state.concat({ type: 'error', payload: action.payload });
    case 'warn':
      return state.concat({ type: 'warn', payload: action.payload });
    case 'debug':
      return state.concat({ type: 'debug', payload: action.payload });
    case 'info':
      return state.concat({ type: 'info', payload: action.payload });
    case 'clear':
      return [];
  }
};
