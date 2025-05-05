/* eslint-disable @typescript-eslint/no-unused-vars */

import DenpasarPage from '@/app/(routes)/denpasar/page';
import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';

describe('Denpasar Page', () => {
  it('should render', () => {
    const page = render(<DenpasarPage />);
    expect(page).toMatchSnapshot();
  });
});

