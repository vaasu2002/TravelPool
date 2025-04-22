import { MongoClient } from 'mongodb';

if(!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}
const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db('TravelPool');
  return { client, db };
}
