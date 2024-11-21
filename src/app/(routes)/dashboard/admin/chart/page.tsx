import { Metadata } from 'next';
import React from 'react';
import Chart from '@/components/Charts/page';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const BasicChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Chart />
    </DefaultLayout>
  );
};

export default BasicChartPage;

