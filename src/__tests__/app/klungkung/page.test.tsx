/* eslint-disable @typescript-eslint/no-unused-vars */

import KlungkungPage from '@/app/(routes)/klungkung/page';
import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';

describe('Klungkung Page', () => {
  it('should render', () => {
    const page = render(<KlungkungPage />);
    expect(page).toMatchSnapshot();
  });
});

