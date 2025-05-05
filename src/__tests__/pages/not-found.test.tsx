/* eslint-disable @typescript-eslint/no-unused-vars */

import NotFoundPage from '@/app/not-found';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { describe } from 'node:test';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('404 Page Simulation', () => {
  it('should render not found when accessing invalid route', () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/invalid-route',
    });

    const { container } = render(<NotFoundPage />);
    screen.findByText('Halaman Tidak Ditemukan');
    expect(container).toMatchSnapshot();
  });
});

