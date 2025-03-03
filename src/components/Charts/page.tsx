'use client';

import dynamic from 'next/dynamic';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import ChartOne from '@/components/Charts/ChartOne';

const ChartThree = dynamic(() => import('@/components/Charts/ChartThree'), {
  ssr: false,
});

const Chart = () => {
  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
      </div>
    </>
  );
};

export default Chart;

