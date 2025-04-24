import { MongoClient } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

if(!process.env.MONGODB_URI){
  throw new Error('Please define the MONGODB_URI environment variable');
}


const uri = process.env.MONGODB_URI;

export async function connectToDatabase(){
  if(cachedClient && cachedDb){
    return { 
      client: cachedClient, 
      db: cachedDb 
    };
  }

  const client = new MongoClient(uri as string);
  await client.connect();
  const db = client.db('TravelPool');

  cachedClient = client;
  cachedDb = db;
  
  return { 
    client, 
    db 
  };
}