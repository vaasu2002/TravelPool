"use client";
import { TaxiPool } from './types';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import PoolForm from './component/PoolForm';
import { useTaxiPools } from './hooks/useTaxiPools';

export default function Home() {
  const { addPool } = useTaxiPools();

  const handleAddPool = (newPool: TaxiPool) => {
    addPool(newPool);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col">
      <Navbar activeView="add" setActiveView={() => {}} />

      <main className="flex-grow container mx-auto py-8 px-4 max-w-4xl">
        <PoolForm onSubmit={handleAddPool} onCancel={() => {}} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
