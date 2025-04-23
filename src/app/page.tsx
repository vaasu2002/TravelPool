"use client";
import { useState } from 'react';
import { TaxiPool } from './types';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import ViewPools from './component/ViewPools';
import PoolForm from './component/PoolForm';
import NoPoolsCTA from './component/NoPoolsCTA';
import { useTaxiPools } from './hooks/useTaxiPools';

export default function Home() {
  // State: view/add
  const [activeView, setActiveView] = useState<'view' | 'add'>('view');
  
  // pool managnment
  const { 
    taxiPools, 
    filteredPools, 
    searchTerm, 
    setSearchTerm, 
    filterDate, 
    setFilterDate, 
    addPool 
  } = useTaxiPools();

  // form sub
  const handleAddPool = (newPool: TaxiPool) => {
    addPool(newPool);
    setActiveView('view');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      
      <main className="container mx-auto py-8 px-4 max-w-6xl">
        {activeView === 'view' ? (
          <ViewPools 
            taxiPools={taxiPools}
            filteredPools={filteredPools}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            onAddNew={() => setActiveView('add')}
          />
        ) : (
          <PoolForm 
            onSubmit={handleAddPool} 
            onCancel={() => setActiveView('view')} 
          />
        )}
      </main>
      
      {/* WHEN NOTHING AVAIL */}
      {taxiPools.length === 0 && activeView === 'view' && (
        <NoPoolsCTA onCreatePool={() => setActiveView('add')} />
      )}
      
      <Footer />
    </div>
  );
}