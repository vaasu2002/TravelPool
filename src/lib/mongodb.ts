import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

const uri = process.env.MONGODB_URI;
const options = {};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

declare global {
  // Use globalThis to avoid the "no-var" error
  // You can attach it to globalThis for caching if needed
  // For now, we can omit this unless you're planning to cache it
  // interface Global {
  //   _mongoClientPromise: Promise<MongoClient>;
  // }
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db('TravelPool');
  return { client, db };
}
