import { MongoClient, ServerApiVersion } from 'mongodb';

const options = {
  serverApi: { version: ServerApiVersion.v1, strict: false, deprecationErrors: true },
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 10000,
};

// Resolved lazily, never at module scope: `next build` imports this file to
// collect route metadata, and throwing there would fail every build that runs
// without secrets (CI, Docker image builds, preview deploys).
function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it to .env.local');
  }

  // In dev, Next.js clears the module cache on every hot reload. Stashing the
  // promise on globalThis stops each reload opening a fresh pool and
  // exhausting the Atlas connection limit.
  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, options).connect();
    }
    return global._mongoClientPromise;
  }

  if (!global._mongoClientPromiseProd) {
    global._mongoClientPromiseProd = new MongoClient(uri, options).connect();
  }
  return global._mongoClientPromiseProd;
}

export function getClientPromise() {
  return connect();
}

export async function getDb() {
  const client = await connect();
  return client.db(process.env.MONGODB_DB || 'portfolio');
}

// Index creation is idempotent; cache the promise so it runs once per process.
let indexesReady = null;

export async function getMessagesCollection() {
  const db = await getDb();
  const collection = db.collection('messages');

  if (!indexesReady) {
    indexesReady = Promise.all([
      collection.createIndex({ createdAt: -1 }),
      collection.createIndex({ email: 1 }),
      collection.createIndex({ status: 1, createdAt: -1 }),
    ]).catch((err) => {
      // Never let index setup take down a submission — log and carry on.
      indexesReady = null;
      console.error('[mongodb] index creation failed:', err.message);
    });
  }
  await indexesReady;

  return collection;
}
