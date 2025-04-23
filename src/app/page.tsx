"use client";
import { useState } from 'react';
import { TaxiPool } from './types';
import PoolForm from './component/PoolForm';
import { useTaxiPools } from './hooks/useTaxiPools';

export default function Home() {
  const { addPool } = useTaxiPools();

  const handleAddPool = (newPool: TaxiPool) => {
    addPool(newPool);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4">
      <PoolForm onSubmit={handleAddPool} onCancel={() => {}} />
    </div>
  );
}
