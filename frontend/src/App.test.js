import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NASA Explorer sidebar title', () => {
  render(<App />);
  const titleElement = screen.getByText(/NASA Explorer/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders APOD section heading', () => {
  render(<App />);
  expect(screen.getByText(/APOD \(Astronomy Picture of the Day\)/i)).toBeInTheDocument();
});