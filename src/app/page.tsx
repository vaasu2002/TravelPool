import { Suspense } from 'react';
import { getTaxiPools } from './component/TaxiPoolsServer';
import ClientWrapper from './component/ClientWrapper';
import Loading from './Loading';

export const dynamic = 'force-dynamic'; // Ensures that this page isn't cached

export default async function Home() {
  const taxiPools = await getTaxiPools();
  
  return (
    <Suspense fallback={<Loading />}>
      <ClientWrapper initialTaxiPools={taxiPools} />
    </Suspense>
  );
}