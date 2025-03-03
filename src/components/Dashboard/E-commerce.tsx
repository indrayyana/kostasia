'use client';

import { DoorOpen, Eye, DollarSign, Users } from 'lucide-react';
// import dynamic from 'next/dynamic';
// import ChartOne from '../Charts/ChartOne';
import CardDataStats from '../CardDataStats';

// const ChartThree = dynamic(() => import('@/components/Charts/ChartThree'), {
//   ssr: false,
// });

const ECommerce = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12 xl:grid-cols-2 2xl:gap-15">
        <CardDataStats
          title="Total Pengunjung"
          total="356"
          rate="0.43%"
          levelUp
        >
          <Eye className="text-primary dark:text-white" />
        </CardDataStats>

        <CardDataStats
          title="Total Profit"
          total="Rp456.000"
          rate="4.35%"
          levelUp
        >
          <DollarSign className="text-primary dark:text-white" />
        </CardDataStats>

        <CardDataStats title="Total Kamar" total="16" rate="2.59%" levelUp>
          <DoorOpen className="text-primary dark:text-white" />
        </CardDataStats>

        <CardDataStats title="Total Penyewa" total="16" rate="0.95%" levelDown>
          <Users className="text-primary dark:text-white" />
        </CardDataStats>
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
      </div> */}
    </>
  );
};

export default ECommerce;

