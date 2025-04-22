import { connectToDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import moment from 'moment-timezone';


export async function POST(request: NextRequest) {
  const newPool = await request.json();
  const { db } = await connectToDatabase();

  const result = await db.collection('taxiPools').insertOne(newPool);

  const insertedDoc = await db.collection('taxiPools').findOne({ _id: result.insertedId });

  return NextResponse.json(insertedDoc);
}

export async function GET() {
  const { db } = await connectToDatabase();

  const nowIST = moment().tz('Asia/Kolkata');
  const allPools = await db.collection('taxiPools').find().sort({ date: -1 }).toArray();

  const upcomingPools = allPools.filter(pool => {
    const [_, endTime] = pool.timeRange.split(' - ');
    const poolDateTime = moment.tz(`${pool.date} ${endTime}`, 'YYYY-MM-DD HH:mm', 'Asia/Kolkata');
    return poolDateTime.isAfter(nowIST);
  });
  return NextResponse.json(upcomingPools);
}