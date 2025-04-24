import { ObjectId } from 'mongodb';
import { CarDetails, TaxiPool } from '@/app/types';
import moment from 'moment';

export interface MongoDBTaxiPool {
    _id?: ObjectId;
    name: string;
    gender: string;
    phone: string;
    startLocation: string;
    endLocation: string;
    midwayDrops: string[];
    date: string;
    timeRange: string;
    hasBooked: boolean;
    carDetails: CarDetails | null;
    phoneRequests: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export function mongoToTaxiPool(doc: MongoDBTaxiPool): TaxiPool {
  return {
        id: doc._id ? doc._id.toString() : Date.now().toString(),
        name: doc.name,
        gender: doc.gender || '',
        phone: doc.phone,
        startLocation: doc.startLocation,
        endLocation: doc.endLocation,
        midwayDrops: Array.isArray(doc.midwayDrops) ? doc.midwayDrops : [],
        date: doc.date,
        timeRange: doc.timeRange,
        hasBooked: Boolean(doc.hasBooked),
        carDetails: doc.carDetails ? {
        carName: doc.carDetails.carName,
        pricePerPerson: Number(doc.carDetails.pricePerPerson),
        seatsLeft: Number(doc.carDetails.seatsLeft)
        } : null,
        phoneRequests: Number(doc.phoneRequests || 0)
    };
}


export function taxiPoolToMongo(pool: TaxiPool): MongoDBTaxiPool {
    const { id, ...mongoDoc } = pool;
    
    return {
        ...mongoDoc,
        hasBooked: Boolean(pool.hasBooked),
        midwayDrops: Array.isArray(pool.midwayDrops) ? pool.midwayDrops : [],
        phoneRequests: Number(pool.phoneRequests || 0)
    };
}


export function isPoolInFuture(pool: MongoDBTaxiPool, nowIST: moment.Moment): boolean {
    try {
        if(!pool.timeRange || !pool.date) return false;
    
        let poolEndTime;
        if(pool.timeRange.includes(' - ')){
            const [, endTime] = pool.timeRange.split(' - ');
            poolEndTime = endTime;
        } 
        else{
            poolEndTime = pool.timeRange;
        }
    
        const poolDateTime = moment.tz(`${pool.date} ${poolEndTime}`, 'YYYY-MM-DD HH:mm', 'Asia/Kolkata');
        if(!poolDateTime.isValid()) return false;
    
        return poolDateTime.isAfter(nowIST);
    }catch(error){
        console.error('Error checking if pool is in future:', error);
    return false;
    }
}