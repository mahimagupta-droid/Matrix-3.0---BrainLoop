/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

type cachedType = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

let cached : cachedType = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_CONNECTION_URI as string, {
      dbName: 'finsightAi'
    }).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
