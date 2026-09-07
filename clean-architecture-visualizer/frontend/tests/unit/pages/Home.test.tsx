import { describe, expect, it } from 'vitest';
import Home from '@/pages/Home';
import { fireEvent, render, screen } from '../../test-utils';

describe('Home Page', () => {
  it('renders the main title from translations', () => {
    render(<Home />);
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('renders all three navigation cards', () => {
    render(<Home />);
    expect(screen.getByText('cards.checker.title')).toBeInTheDocument();
    expect(screen.getByText('cards.learn.title')).toBeInTheDocument();
    expect(screen.getByText('cards.starter.title')).toBeInTheDocument();
  });

  it('opens the info dialog when the info button is clicked', async () => {
    render(<Home />);

    const infoButton = screen.getByLabelText('infoDialog.title');
    fireEvent.click(infoButton);

    const dialogTitle = await screen.findByText('infoDialog.title');
    expect(dialogTitle).toBeInTheDocument();
  });
});
