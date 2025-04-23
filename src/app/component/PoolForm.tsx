"use client";
import React, { useState, useEffect } from 'react';
import { TaxiPool } from '../types';

interface PoolFormProps {
  onSubmit: (pool: TaxiPool) => void;
  onCancel: () => void;
}
const COMMON_LOCATIONS = [
  'VIT BHOPAL UNIVERSITY',
  'DB MALL',
  'SEHORE',
  'INDORE AIRPORT',
  'BHOPAL AIRPORT',
  'UJJAIN',
  'BHOPAL JUNCTION',
  'RANI KAMLAPATI STATION',
  'SEHORE STATION',
  'SANT HIRDARAM RAILWAY STATION',
  'BHOPAL CITY',
  'INDORE CITY'
]
const PoolForm: React.FC<PoolFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [startLocation, setStartLocation] = useState('');
  const [customStartLocation, setCustomStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [customEndLocation, setCustomEndLocation] = useState('');
  const [midwayDrops, setMidwayDrops] = useState('');
  
  // Time deeds
  const [date, setDate] = useState('');
  const [isTravelingAround, setIsTravelingAround] = useState(false);
  const [departureTime, setDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  
  const [hasBooked, setHasBooked] = useState(false);
  const [carName, setCarName] = useState('');
  const [pricePerPerson, setPricePerPerson] = useState('');
  const [seatsLeft, setSeatsLeft] = useState(3);

  const [errors, setErrors] = useState({
    locations: '',
    date: '',
    timeRange: ''
  });

  const today = new Date().toISOString().split('T')[0]; 

  const handleStartLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setStartLocation(value);
    if(value !== 'custom'){
      setCustomStartLocation('');
    }
    validateLocations(value, endLocation);
  };
  
  const handleEndLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setEndLocation(value);
    if(value !== 'custom'){
      setCustomEndLocation('');
    }
    validateLocations(startLocation, value);
  };
  
  // to&from not same and atleast on should be uni
  const validateLocations = (start: string, end: string) => {
    const actualStart = start === 'custom' ? customStartLocation : start;
    const actualEnd = end === 'custom' ? customEndLocation : end;
    if(actualStart && actualEnd && actualStart === actualEnd) {
      setErrors(prev => ({ ...prev, locations: 'Start and end locations cannot be the same' }));
      return false;
    }
    if (actualStart && actualEnd && 
        actualStart !== 'VIT BHOPAL UNIVERSITY' && 
        actualEnd !== 'VIT BHOPAL UNIVERSITY') {
      setErrors(prev => ({ ...prev, locations: 'At least one location must be VIT BHOPAL UNIVERSITY' }));
      return false;
    }

    setErrors(prev => ({ ...prev, locations: '' }));
    return true;
  };

  const validateDate = (selectedDate: string) => {
    if (!selectedDate) return false;

    const selected = new Date(selectedDate);
    const current = new Date();
    current.setHours(0, 0, 0, 0);

    if (selected < current) {
      setErrors(prev => ({ ...prev, date: 'Date cannot be in the past' }));
      return false;
    }

    setErrors(prev => ({ ...prev, date: '' }));
    return true;
  };

  const validateTimeRange = (start: string, end: string) => {
    if (!start || !end) return true; 

    if (start && end && start > end) {
      setErrors(prev => ({ ...prev, timeRange: 'End time must be after start time' }));
      return false;
    }

    setErrors(prev => ({ ...prev, timeRange: '' }));
    return true;
  };

 
  useEffect(() => {
    if (startLocation === 'custom' || endLocation === 'custom') {
      validateLocations(startLocation, endLocation);
    }
  }, [customStartLocation, customEndLocation]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);
    validateDate(value);
  };

  const handleDepartureTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDepartureTime(value);
    validateTimeRange(value, arrivalTime);
  };

  const handleArrivalTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setArrivalTime(value);
    validateTimeRange(departureTime, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const actualStartLocation = startLocation === 'custom' ? customStartLocation : startLocation;
    const actualEndLocation = endLocation === 'custom' ? customEndLocation : endLocation;
    
    const isLocationsValid = validateLocations(startLocation, endLocation);
    const isDateValid = validateDate(date);
    const isTimeRangeValid = validateTimeRange(departureTime, arrivalTime);
    
    if (!isLocationsValid || !isDateValid || !isTimeRangeValid) {
      return;
    }
    
    let timeRangeText = '';
    if (isTravelingAround) {
      timeRangeText = 'Traveling around';
    } else if (departureTime && arrivalTime) {
      timeRangeText = `${departureTime} - ${arrivalTime}`;
    } else {
      timeRangeText = departureTime;
    }
    
    const newPool = {
      id: Date.now(),
      name,
      gender: '', 
      phone,
      startLocation: actualStartLocation,
      endLocation: actualEndLocation,
      midwayDrops: midwayDrops.split(',').map(loc => loc.trim()).filter(Boolean),
      date,
      timeRange: timeRangeText,
      hasBooked,
      carDetails: hasBooked ? {
        carName,
        pricePerPerson: parseFloat(pricePerPerson) || 0,
        seatsLeft: parseInt(seatsLeft.toString())
      } : null,
      phoneRequests: 0
    };
    
    onSubmit(newPool);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Add Travel Details!</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Your Details</label>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Name*</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    required 
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number*</label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    required 
                    placeholder="Your contact number"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-medium text-gray-700">Journey Details</label>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Start Location*</label>
                  <select 
                    value={startLocation} 
                    onChange={handleStartLocationChange}
                    className={`w-full p-3 border ${errors.locations ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                    required
                  >
                    <option value="">Select Location</option>
                    {COMMON_LOCATIONS.map(location => (
                      <option key={`start-${location}`} value={location}>{location}</option>
                    ))}
                    <option value="custom">Add New Location</option>
                  </select>
                  
                  {startLocation === 'custom' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={customStartLocation}
                        onChange={(e) => setCustomStartLocation(e.target.value)}
                        className={`w-full p-3 border ${errors.locations ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                        placeholder="Enter your start location"
                        required
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">End Location*</label>
                  <select 
                    value={endLocation} 
                    onChange={handleEndLocationChange}
                    className={`w-full p-3 border ${errors.locations ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                    required
                  >
                    <option value="">Select Location</option>
                    {COMMON_LOCATIONS.map(location => (
                      <option key={`end-${location}`} value={location}>{location}</option>
                    ))}
                    <option value="custom">Add New Location</option>
                  </select>
                  
                  {endLocation === 'custom' && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={customEndLocation}
                        onChange={(e) => setCustomEndLocation(e.target.value)}
                        className={`w-full p-3 border ${errors.locations ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                        placeholder="Enter your destination"
                        required
                      />
                    </div>
                  )}
                </div>
                
                {errors.locations && (
                  <div className="text-red-500 text-sm mt-1">{errors.locations}</div>
                )}
                
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Midway Drops (Optional)</label>
                  <input 
                    type="text" 
                    value={midwayDrops} 
                    onChange={(e) => setMidwayDrops(e.target.value)} 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                    placeholder="Comma-separated list of midway locations"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Schedule</label>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Date*</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={handleDateChange} 
                    min={today}
                    className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`} 
                    required 
                  />
                  {errors.date && (
                    <div className="text-red-500 text-sm mt-1">{errors.date}</div>
                  )}
                </div>
                
                <div>
                  <span>What time you wanna leave between?(eg- between 9am and 10am)</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Leave After*</label>
                      <input 
                        type="time" 
                        value={departureTime} 
                        onChange={handleDepartureTimeChange} 
                        className={`w-full p-3 border ${errors.timeRange ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`} 
                        required={!isTravelingAround} 
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Leave Before</label>
                      <input 
                        type="time" 
                        value={arrivalTime} 
                        onChange={handleArrivalTimeChange} 
                        className={`w-full p-3 border ${errors.timeRange ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`} 
                      />
                    </div>
                  </div>
                  {errors.timeRange && (
                    <div className="text-red-500 text-sm mt-1">{errors.timeRange}</div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Cab Details */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Cab Details</label>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={hasBooked} 
                      onChange={(e) => setHasBooked(e.target.checked)} 
                      className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" 
                    />
                    <span className="text-gray-700 font-medium">I have already booked a cab</span>
                  </label>
                </div>
                
                {hasBooked && (
                  <div className="space-y-4 border-l-4 border-green-500 pl-4 py-2">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Car Model/Type</label>
                      <input 
                        type="text" 
                        value={carName} 
                        onChange={(e) => setCarName(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                        placeholder="e.g. Ertiga/Load Omni"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Price Per Person (₹)</label>
                      <input 
                        type="number" 
                        min="0" 
                        step="0.01" 
                        value={pricePerPerson} 
                        onChange={(e) => setPricePerPerson(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" 
                        placeholder="Amount in rupees"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Seats Available</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="range" 
                          min="1" 
                          max="10" 
                          value={seatsLeft} 
                          onChange={(e) => setSeatsLeft(parseInt(e.target.value))} 
                          className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded dark:bg-indigo-200 dark:text-indigo-800">{seatsLeft}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <button 
            type="button" 
            onClick={onCancel}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm py-2 px-4"
          >
            Back to Listings
          </button>
          
          <button 
            type="submit" 
            className="bg-indigo-600 text-white py-2 px-5 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-medium text-base shadow-md flex items-center"
          >
            Add Taxi Pool
          </button>
        </div>
      </form>
    </div>
  );
};

export default PoolForm;