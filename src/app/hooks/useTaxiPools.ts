import { useEffect, useState } from 'react';
import { TaxiPool } from '../types';

export function useTaxiPools() {
  const [taxiPools, setTaxiPools] = useState<TaxiPool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchPools = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/taxiPools');
        const data = await res.json();
        setTaxiPools(data);
      } catch (error) {
        console.error('Failed to fetch taxi pools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  const addPool = async (newPool: TaxiPool) => {
    const res = await fetch('/api/taxiPools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPool),
    });

    if (res.ok) {
      const created = await res.json();
      setTaxiPools(prev => [created, ...prev]);
    } else {
      console.error('Failed to add new pool');
    }
  };

  const filteredPools = taxiPools.filter(pool => {
    const searchMatch =
      searchTerm === '' ||
      pool.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.endLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.midwayDrops.some(drop => drop.toLowerCase().includes(searchTerm.toLowerCase()));

    const dateMatch = filterDate === '' || pool.date === filterDate;

    return searchMatch && dateMatch;
  });

  return {
    taxiPools,
    filteredPools,
    searchTerm,
    setSearchTerm,
    filterDate,
    setFilterDate,
    addPool,
    loading,
  };
}
