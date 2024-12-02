/* eslint-disable @typescript-eslint/no-unused-vars */

import ErrorPage from '@/app/error';
import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';

describe('Error Page', () => {
  it('should render', () => {
    const { container } = render(<ErrorPage />);
    screen.findByText('Internal Server Error');
    expect(container).toMatchSnapshot();
  });
});

