import { MongoClient, type Db } from "mongodb"

const DB_NAME = "araviapeaks"

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

// Fail fast on a connectivity hiccup instead of hanging on the driver's
// 30s default — that default can outlast Vercel's own function timeout,
// turning a slow DB into a fully-hung request instead of a quick fallback.
const CLIENT_OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to your environment (see .env.local).")
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri, CLIENT_OPTIONS).connect()
    }
    return global._mongoClientPromise
  }

  return new MongoClient(uri, CLIENT_OPTIONS).connect()
}

let clientPromise: Promise<MongoClient> | undefined

export async function getDb(): Promise<Db> {
  if (!clientPromise) {
    clientPromise = getClientPromise()
  }
  const client = await clientPromise
  return client.db(DB_NAME)
}
