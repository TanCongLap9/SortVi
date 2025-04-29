import { Generates } from '../shuffle/generate';
import { OptionAction, OptionActionType, OptionsState } from '../types/option';
import { Shuffles } from '../types/shuffle';

export const optionsReducer = (
  state: OptionsState,
  action: OptionAction
): OptionsState => {
  const optionsLS = localStorage.getItem(OptionActionType.OPTIONS);
  const options: OptionsState = optionsLS ? JSON.parse(optionsLS) : {};

  switch (action.type) {
    case OptionActionType.IS_SHOWN:
      return {
        ...state,
        [OptionActionType.IS_SHOWN]: action.payload,
      };
    case OptionActionType.CREATION_ALGO:
      setOptionsLS(
        options,
        {
          [OptionActionType.CREATION_ALGO]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.CREATION_ALGO]: action.payload,
      };
    case OptionActionType.SHUFFLE_ALGO:
      setOptionsLS(
        options,
        {
          [OptionActionType.SHUFFLE_ALGO]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.SHUFFLE_ALGO]: action.payload,
      };
    case OptionActionType.PATTERN:
      setOptionsLS(
        options,
        {
          [OptionActionType.PATTERN]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.PATTERN]: action.payload,
      };
    case OptionActionType.SPEED:
      setOptionsLS(
        options,
        {
          [OptionActionType.SPEED]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.SPEED]: action.payload,
      };
    case OptionActionType.EACH:
      setOptionsLS(
        options,
        {
          [OptionActionType.EACH]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.EACH]: action.payload,
      };
    case OptionActionType.UNIT:
      setOptionsLS(
        options,
        {
          [OptionActionType.UNIT]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.UNIT]: action.payload,
      };
    case OptionActionType.AMOUNT:
      setOptionsLS(
        options,
        {
          [OptionActionType.AMOUNT]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.AMOUNT]: action.payload,
      };
    case OptionActionType.SEGMENTS:
      setOptionsLS(
        options,
        {
          [OptionActionType.SEGMENTS]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.SEGMENTS]: action.payload,
      };
    case OptionActionType.DECIMAL:
      setOptionsLS(
        options,
        {
          [OptionActionType.DECIMAL]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.DECIMAL]: action.payload,
      };
    case OptionActionType.MIN:
      setOptionsLS(
        options,
        {
          [OptionActionType.MIN]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.MIN]: action.payload,
      };
    case OptionActionType.MAX:
      setOptionsLS(
        options,
        {
          [OptionActionType.MAX]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.MAX]: action.payload,
      };
    case OptionActionType.CODE:
      setOptionsLS(
        options,
        {
          [OptionActionType.CODE]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        [OptionActionType.CODE]: action.payload,
        [OptionActionType.IS_DIRTY_CODE]: true,
      };
    case OptionActionType.IS_DIRTY_CODE:
      return {
        ...state,
        [OptionActionType.IS_DIRTY_CODE]: action.payload,
      };
    case OptionActionType.LENGTH:
      if (Number(action.payload) <= 1) {
        console.error(`Invalid length: ${action.payload}`);
        return state;
      }

      setOptionsLS(
        options,
        {
          [OptionActionType.LENGTH]: action.payload,
        },
        action.localStorage
      );

      return {
        ...state,
        length: action.payload,
      };
    case OptionActionType.RESET:
      action.localStorage.removeItem(OptionActionType.OPTIONS);
      return optionsReducer(state, {
        type: OptionActionType.DEFAULT,
        localStorage: action.localStorage,
      });
    case OptionActionType.DEFAULT:
      return getDefaultOptions(action.localStorage);
  }
};

export const getDefaultOptions = (localStorage: Storage) => {
  const optionsLS = localStorage.getItem(OptionActionType.OPTIONS);
  const options: OptionsState = optionsLS ? JSON.parse(optionsLS) : {};
  return {
    [OptionActionType.SPEED]: options?.[OptionActionType.SPEED] ?? 500,
    [OptionActionType.LENGTH]: options?.[OptionActionType.LENGTH] ?? 10,
    [OptionActionType.EACH]: options?.[OptionActionType.EACH] ?? 5,
    [OptionActionType.SEGMENTS]: options?.[OptionActionType.SEGMENTS] ?? 1,
    [OptionActionType.MIN]: options?.[OptionActionType.MIN] ?? 0,
    [OptionActionType.IS_SHOWN]: false,
    [OptionActionType.MAX]: options?.[OptionActionType.MAX] ?? 100,
    [OptionActionType.DECIMAL]: options?.[OptionActionType.DECIMAL] ?? false,
    [OptionActionType.AMOUNT]: options?.[OptionActionType.AMOUNT] ?? 5,
    [OptionActionType.UNIT]: options?.[OptionActionType.UNIT] ?? 'element',
    [OptionActionType.CODE]: options?.[OptionActionType.CODE] ?? '',
    [OptionActionType.PATTERN]: options?.[OptionActionType.PATTERN] ?? [
      1, 2, 3,
    ],
    [OptionActionType.CREATION_ALGO]:
      options?.[OptionActionType.CREATION_ALGO] ?? Generates.UNIQUE,
    [OptionActionType.IS_DIRTY_CODE]: true,
    [OptionActionType.SHUFFLE_ALGO]:
      options?.[OptionActionType.SHUFFLE_ALGO] ?? Shuffles.RANDOM,
  };
};

const setOptionsLS = (
  options: OptionsState,
  obj: Partial<OptionsState>,
  localStorage: Storage
) =>
  localStorage.setItem(
    OptionActionType.OPTIONS,
    JSON.stringify(Object.assign(options, obj))
  );
