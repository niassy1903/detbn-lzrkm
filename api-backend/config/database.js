import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config({
  path: resolve(fileURLToPath(new URL('../..', import.meta.url)), '.env')
});

export function getMongoUri() {
  const uri = process.env.MONGO_URI?.trim();

  if (!uri) {
    throw new Error('MONGO_URI is required. Set it to the MongoDB connection string.');
  }

  if (!/^mongodb(?:\+srv)?:\/\//i.test(uri)) {
    throw new Error('MONGO_URI must start with mongodb:// or mongodb+srv://.');
  }

  return uri;
}
