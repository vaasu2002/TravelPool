import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import moment from 'moment-timezone';
import { 
    MongoDBTaxiPool, 
    mongoToTaxiPool, 
    isPoolInFuture 
} from '@/lib/mongodb-types';

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const nowIST = moment().tz('Asia/Kolkata');
        
        const allPools = await db.collection('taxiPools').find().sort({ date: -1 }).toArray() as MongoDBTaxiPool[];
        
        const upcomingPools = allPools.filter(pool => isPoolInFuture(pool, nowIST));
        
        const formattedPools = upcomingPools.map(mongoToTaxiPool);
        
        return NextResponse.json(formattedPools);
    }catch(error){
        console.error('Error refreshing taxi pools:', error);
        return NextResponse.json(
            { error: 'Failed to refresh taxi pools' },
            { status: 500 }
        );
    }
}