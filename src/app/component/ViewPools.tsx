import React from 'react';
import { TaxiPool } from '../types';
import SearchFilter from './SearchFilter';
import PoolCard from './PoolCard';
import EmptyState from './EmptyState';

interface ViewPoolsProps {
  taxiPools: TaxiPool[];
  filteredPools: TaxiPool[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterDate: string;
  setFilterDate: (date: string) => void;
  onAddNew: () => void;
}

const ViewPools: React.FC<ViewPoolsProps> = ({
  taxiPools,
  filteredPools,
  searchTerm,
  setSearchTerm,
  filterDate,
  setFilterDate,
  onAddNew
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Available Taxi Pools</h2>
      
      <SearchFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />
      
      {filteredPools.length === 0 ? (
        <EmptyState 
          hasPoolsButFiltered={taxiPools.length > 0} 
          onAddNew={onAddNew} 
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPools.map((pool) => (
            <PoolCard 
              key={pool.id} 
              pool={pool} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPools;