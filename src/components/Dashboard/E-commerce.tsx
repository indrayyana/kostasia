'use client';

import { DoorOpen, Eye, DollarSign, Users } from 'lucide-react';
// import dynamic from 'next/dynamic';
// import ChartOne from '../Charts/ChartOne';
import CardDataStats from '../CardDataStats';
import { useFetchUserDashboard } from '../../hooks/useUser';
import { priceFormat } from '../../utils/format';

// const ChartThree = dynamic(() => import('@/components/Charts/ChartThree'), {
//   ssr: false,
// });

const ECommerce = () => {
  const { data, isPending } = useFetchUserDashboard();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-12 xl:grid-cols-2 2xl:gap-15">
        {!isPending && (
          <>
            <CardDataStats title="Total Pengunjung" total={`${data?.total_pengunjung}`} rate="0.43%" levelUp>
              <Eye className="text-primary dark:text-white" />
            </CardDataStats>

            <CardDataStats
              title="Total Pemasukan"
              total={`${data?.total_pemasukan ? priceFormat(data?.total_pemasukan) : 0}`}
              rate="4.35%"
              levelUp
            >
              <DollarSign className="text-primary dark:text-white" />
            </CardDataStats>

            <CardDataStats title="Total Kamar" total={`${data?.total_kamar}`} rate="2.59%" levelUp>
              <DoorOpen className="text-primary dark:text-white" />
            </CardDataStats>

            <CardDataStats title="Total Penyewa" total={`${data?.total_penyewa}`} rate="0.95%" levelDown>
              <Users className="text-primary dark:text-white" />
            </CardDataStats>
          </>
        )}
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartThree />
      </div> */}
    </>
  );
};

export default ECommerce;

