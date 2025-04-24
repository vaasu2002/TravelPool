import { connectToDatabase } from '@/lib/mongodb';
import moment from 'moment-timezone';
import { TaxiPool } from '../types';

export async function getTaxiPools() {
  const { db } = await connectToDatabase();
  const nowIST = moment().tz('Asia/Kolkata');
  
  try {
    const allPools = await db.collection('taxiPools').find().sort({ date: -1 }).toArray();
    
    const upcomingPools = allPools.filter((pool: { timeRange: string; date: any; }) => {
      try {
        let poolEndTime;
        
        if(pool.timeRange && pool.timeRange.includes(' - ')){
          const timeParts = pool.timeRange.split(' - ');
          poolEndTime = timeParts[1];
        } 
        else{
            poolEndTime = pool.timeRange;
        }
        
        if (pool.date && poolEndTime) {
          const dateTimeStr = `${pool.date} ${poolEndTime}`;
          const poolDateTime = moment.tz(dateTimeStr, 'YYYY-MM-DD HH:mm', 'Asia/Kolkata');
          
          if(poolDateTime.isValid()){
            return poolDateTime.isAfter(nowIST);
          }
        }
        
        return true;
      }catch(error){
        console.error('Error filtering pool:', error, pool);
        return true;
      }
    });
    
    return upcomingPools.map((pool: { _id: { toString: () => any; }; name: any; gender: any; phone: any; startLocation: any; endLocation: any; midwayDrops: string[]; date: any; timeRange: any; hasBooked: any; carDetails: { carName: any; pricePerPerson: any; seatsLeft: any; }; phoneRequests: any; }) => {
      const taxiPool: TaxiPool = {
        id: pool._id.toString(), 
        name: pool.name,
        gender: pool.gender || '',
        phone: pool.phone,
        startLocation: pool.startLocation,
        endLocation: pool.endLocation,
        midwayDrops: Array.isArray(pool.midwayDrops) ? pool.midwayDrops : [],
        date: pool.date,
        timeRange: pool.timeRange,
        hasBooked: Boolean(pool.hasBooked),
        carDetails: pool.carDetails ? {
          carName: pool.carDetails.carName,
          pricePerPerson: Number(pool.carDetails.pricePerPerson),
          seatsLeft: Number(pool.carDetails.seatsLeft)
        } : null,
        phoneRequests: Number(pool.phoneRequests || 0)
      };
      
      return taxiPool;
    });
  }catch(error){
    console.error('Error fetching taxi pools:', error);
    return [];
  }
}