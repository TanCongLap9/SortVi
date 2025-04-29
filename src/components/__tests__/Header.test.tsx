import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SVRouter } from '../../SVRouter';

describe('full page', () => {
  it('navigates', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <SVRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId(/home/)).toBeInTheDocument();
    await fireEvent.click(screen.getByRole('link', { name: /API/ }));
    expect(screen.getByTestId(/api/)).toBeInTheDocument();
    await fireEvent.click(screen.getByRole('link', { name: /Home/ }));
    expect(screen.getByTestId(/home/)).toBeInTheDocument();
  });
  it('has 404 page', () => {
    render(
      <MemoryRouter initialEntries={['/non-exist']}>
        <SVRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId(/404/)).toBeInTheDocument();
  });
});
