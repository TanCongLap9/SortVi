import '@testing-library/jest-dom';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import {
  createContext,
  Dispatch,
  useEffect,
  useReducer,
  useTransition,
} from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import {
  getDefaultOptions,
  optionsReducer,
} from '../../../reducers/OptionsReducer';
import { localStorage } from '../../../setupTests';
import {
  OptionAction,
  OptionActionType,
  OptionsState,
} from '../../../types/option';
import { Shuffles } from '../../../types/shuffle';
import { OptionsModal } from '../OptionsModal';

interface OptionsContext {
  options: OptionsState;
  setOptions: Dispatch<OptionAction>;
}

const OptionsContext = createContext({} as OptionsContext);
const App = ({ defaultOptions }: { defaultOptions: OptionsState }) => {
  const [options, setOptions] = useReducer(optionsReducer, defaultOptions);
  return <OptionsModal options={options} setOptions={setOptions} />;
};

describe('OptionsModal', () => {
  const defaultOptions = getDefaultOptions(localStorage);
  defaultOptions[OptionActionType.IS_SHOWN] = true;

  it('shows and closes', async () => {
    const elem = render(<App defaultOptions={defaultOptions} />);
    screen.debug(elem.baseElement, undefined, { maxDepth: 2 });

    elem.rerender(
      <App
        defaultOptions={{
          ...defaultOptions,
          [OptionActionType.IS_SHOWN]: false,
        }}
      />
    );

    await act(() => new Promise((res) => setTimeout(res, 1000)));
    screen.debug(elem.baseElement, undefined, { maxDepth: 2 });
  });

  describe('shuffleAlgo', () => {
    it('if set to ascending: shows number of segments to be split', async () => {
      render(<App defaultOptions={defaultOptions} />);
      const user = userEvent.setup();
      const shuffle: HTMLSelectElement = screen.getByTestId(/shuffle/);
      user.selectOptions(
        shuffle,
        within(shuffle).getByRole('option', {
          name: /asc/i,
        })
      );
      await waitFor(() => expect(shuffle.value).toBe(Shuffles.ASC));
      expect(screen.getByTestId(/segments/)).not.toHaveClass('d-none');
    });
    it('if set to descending: shows number of segments to be split', async () => {
      render(<App defaultOptions={defaultOptions} />);
      const user = userEvent.setup();
      const shuffle: HTMLSelectElement = screen.getByTestId(/shuffle/);
      user.selectOptions(
        shuffle,
        within(shuffle).getByRole('option', {
          name: /desc/i,
        })
      );
      await waitFor(() => expect(shuffle.value).toBe(Shuffles.DESC));
      expect(screen.getByTestId(/segments/)).not.toHaveClass('d-none');
    });
    it('if set to mountain (asc-desc): shows number of segments to be split', async () => {
      render(<App defaultOptions={defaultOptions} />);
      const user = userEvent.setup();
      const shuffle: HTMLSelectElement = screen.getByTestId(/shuffle/);
      user.selectOptions(
        shuffle,
        within(shuffle).getByRole('option', {
          name: /mountain/i,
        })
      );
      await waitFor(() => expect(shuffle.value).toBe(Shuffles.ASC_DESC));
      expect(screen.getByTestId(/segments/)).not.toHaveClass('d-none');
    });
    it('if set to trench (desc-asc): shows number of segments to be split', async () => {
      render(<App defaultOptions={defaultOptions} />);
      const user = userEvent.setup();
      const shuffle: HTMLSelectElement = screen.getByTestId(/shuffle/);
      user.selectOptions(
        shuffle,
        within(shuffle).getByRole('option', {
          name: /trench/i,
        })
      );
      await waitFor(() => expect(shuffle.value).toBe(Shuffles.DESC_ASC));
      expect(screen.getByTestId(/segments/)).not.toHaveClass('d-none');
    });
    it('if set to trench (desc-asc): shows number of segments to be split', async () => {
      render(<App defaultOptions={defaultOptions} />);
      const user = userEvent.setup();
      const shuffle: HTMLSelectElement = screen.getByTestId(/shuffle/);
      user.selectOptions(
        shuffle,
        within(shuffle).getByRole('option', {
          name: /trench/i,
        })
      );
      await waitFor(() => expect(shuffle.value).toBe(Shuffles.DESC_ASC));
      expect(screen.getByTestId(/segments/)).not.toHaveClass('d-none');
    });
    it('if set to scrambled head: shows number of elements or percent to be random', async () => {
      render(<App defaultOptions={defaultOptions} />);
      const user = userEvent.setup();
      const shuffle: HTMLSelectElement = screen.getByTestId('shuffle');
      user.selectOptions(
        shuffle,
        within(shuffle).getByRole('option', {
          name: /scrambled head/i,
        })
      );
      await waitFor(() => expect(shuffle.value).toBe(Shuffles.SCRAMBLED_HEAD));
      expect(screen.getByTestId(/elements/)).not.toHaveClass('d-none');
    });
    it('if set to scrambled tail: shows number of elements or percent to be random', async () => {
      render(<App defaultOptions={defaultOptions} />);
      const user = userEvent.setup();
      const shuffle: HTMLSelectElement = screen.getByTestId('shuffle');
      user.selectOptions(
        shuffle,
        within(shuffle).getByRole('option', {
          name: /scrambled tail/i,
        })
      );
      await waitFor(() => expect(shuffle.value).toBe(Shuffles.SCRAMBLED_TAIL));
      expect(screen.getByTestId(/elements/)).not.toHaveClass('d-none');
    });
  });
});
