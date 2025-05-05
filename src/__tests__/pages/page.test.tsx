/* eslint-disable @typescript-eslint/no-unused-vars */

import RootLayout from '@/app/layout';
import RootPage from '@/app/page';
import { render, screen } from '@testing-library/react';
import { describe } from 'node:test';

describe('Root Page', () => {
  it('should render', () => {
    const page = render(
      <RootLayout>
        <RootPage />
      </RootLayout>
    );
    expect(page).toMatchSnapshot();
  });
});

