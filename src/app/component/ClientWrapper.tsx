'use client';

import { useState, useEffect, useMemo } from 'react';
import { TaxiPool } from '../types';
import Navbar from './Navbar';
import Footer from './Footer';
import ViewPools from './ViewPools';
import PoolForm from './PoolForm';
import NoPoolsCTA from './NoPoolsCTA';

interface ClientWrapperProps {
    initialTaxiPools: TaxiPool[];
}

export default function ClientWrapper({ initialTaxiPools }: ClientWrapperProps) {
    // View state: view/add
    const [activeView, setActiveView] = useState<'view' | 'add'>('view');
  
    // Pool state with initial data from server
    const [taxiPools, setTaxiPools] = useState<TaxiPool[]>(initialTaxiPools);
    
    // Filtering state
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDate, setFilterDate] = useState('');
    
    // Filtered pools based on search and date filters
    const filteredPools = useMemo(() => {
        return taxiPools.filter(pool => {
        const matchesSearch = 
            !searchTerm ||
            pool.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pool.endLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pool.midwayDrops.some(drop => drop.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesDate = !filterDate || pool.date === filterDate;
        
        return matchesSearch && matchesDate;
        });
    }, [taxiPools, searchTerm, filterDate]);
    
        // Refresh taxi pools from server
        const refreshPools = async () => {
            try {
                const response = await fetch('/api/taxiPools/refresh');
                if(response.ok) {
                    const freshPools = await response.json();
                    setTaxiPools(freshPools);
                }
            }catch(error){
                console.error('Error refreshing pools:', error);
            }
        };

    useEffect(() => {
        const intervalId = setInterval(refreshPools, 60000); // every 60sec
        return () => clearInterval(intervalId);
    }, []);
    
    const addPool = async (newPool: TaxiPool) => {
        try {
            const poolToSubmit = { 
                ...newPool,
                id: newPool.id || Date.now()
            };
            
            const response = await fetch('/api/taxiPools', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(poolToSubmit),
            });
            
            if(!response.ok){
                throw new Error('Failed to add pool');
            }
            
            const createdPool = await response.json();
            
            const typedPool: TaxiPool = {
                ...createdPool,
                carDetails: createdPool.carDetails ? {
                carName: createdPool.carDetails.carName,
                pricePerPerson: Number(createdPool.carDetails.pricePerPerson),
                seatsLeft: Number(createdPool.carDetails.seatsLeft)
                } : null,
            };
            
            setTaxiPools(prev => [typedPool, ...prev]);
            
            setTimeout(refreshPools, 1000);
        }catch (error){
            console.error('Error adding pool:', error);
            setTaxiPools(prev => [newPool, ...prev]);
        }
    };
    
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
        
        {taxiPools.length === 0 && activeView === 'view' && (
            <NoPoolsCTA onCreatePool={() => setActiveView('add')} />
        )}
        
        <Footer />
        </div>
    );
}