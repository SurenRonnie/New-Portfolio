import { getDb } from '@/lib/mongodb';

const MAX_TURNS = 12; // messages kept in the model's context window

let indexesReady = null;

async function sessionsCollection() {
  const db = await getDb();
  const col = db.collection('chat_sessions');

  if (!indexesReady) {
    indexesReady = Promise.all([
      col.createIndex({ sessionId: 1 }, { unique: true }),
      col.createIndex({ updatedAt: -1 }),
      // Sessions self-destruct 30 days after last activity.
      col.createIndex({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 }),
    ]).catch((err) => {
      indexesReady = null;
      console.error('[memory] index creation failed:', err.message);
    });
  }
  await indexesReady;
  return col;
}

/** Recent turns for a session, oldest first, shaped for the LLM. */
export async function loadHistory(sessionId) {
  if (!sessionId) return [];
  try {
    const col = await sessionsCollection();
    const doc = await col.findOne({ sessionId }, { projection: { messages: { $slice: -MAX_TURNS } } });
    return (doc?.messages || []).map((m) => ({ role: m.role, content: m.content }));
  } catch (err) {
    // Memory is a nice-to-have; a DB hiccup must not break the chat.
    console.error('[memory] loadHistory failed:', err.message);
    return [];
  }
}

/** Appends one user/assistant exchange and updates session metadata. */
export async function saveTurn(sessionId, { question, answer, intent, sentiment, meta = {} }) {
  if (!sessionId) return;
  const now = new Date();
  try {
    const col = await sessionsCollection();
    await col.updateOne(
      { sessionId },
      {
        $push: {
          messages: {
            $each: [
              { role: 'user', content: question, at: now },
              { role: 'assistant', content: answer, at: now, intent, sentiment },
            ],
            // Keep the stored transcript bounded.
            $slice: -60,
          },
        },
        $set: { updatedAt: now, lastIntent: intent, lastSentiment: sentiment, ...meta },
        $setOnInsert: { sessionId, createdAt: now },
        $inc: { turnCount: 1 },
      },
      { upsert: true }
    );
  } catch (err) {
    console.error('[memory] saveTurn failed:', err.message);
  }
}

export { MAX_TURNS };
