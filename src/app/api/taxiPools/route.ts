import { connectToDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import moment from 'moment-timezone';
import { TaxiPool } from '@/app/types';
import { 
  MongoDBTaxiPool, 
  taxiPoolToMongo, 
  mongoToTaxiPool, 
  isPoolInFuture 
} from '@/lib/mongodb-types';

export async function POST(request: NextRequest) {
  try {
    const newPool = await request.json() as TaxiPool;
    const { db } = await connectToDatabase();
    
    const mongoPool = taxiPoolToMongo(newPool);
    
    mongoPool.createdAt = new Date();
    mongoPool.updatedAt = new Date();
    
    const result = await db.collection('taxiPools').insertOne(mongoPool);
    const insertedDoc = await db.collection('taxiPools').findOne({ _id: result.insertedId }) as MongoDBTaxiPool;
    
    const createdPool = mongoToTaxiPool(insertedDoc);
    
    return NextResponse.json(createdPool);

  }catch(error){
    console.error('Error creating taxi pool:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create taxi pool' 
      },
      { 
        status: 500 
      }
    );
  }
}

export async function GET() {
  try{
    const { db } = await connectToDatabase();
    const nowIST = moment().tz('Asia/Kolkata');
    
    const allPools = await db.collection('taxiPools').find().sort({ date: -1 }).toArray() as MongoDBTaxiPool[];
    
    const upcomingPools = allPools.filter(pool => isPoolInFuture(pool, nowIST));
    
    const formattedPools = upcomingPools.map(mongoToTaxiPool);
    
    return NextResponse.json(formattedPools);
  }catch(error){
    console.error('Error fetching taxi pools:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch taxi pool' 
      },
      { 
        status: 500 
      }
    );
  }
}