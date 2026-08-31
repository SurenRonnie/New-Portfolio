// Verifies MONGODB_URI actually connects. Never prints the password.
// Usage: node scripts/check-db.mjs
import 'dotenv/config';
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

// .env.local wins over .env, matching Next.js precedence.
config({ path: '.env.local', override: true });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'portfolio';

if (!uri) {
  console.error('✗ MONGODB_URI not set. Add it to .env.local');
  process.exit(1);
}

const m = /^mongodb(\+srv)?:\/\/([^:]*):([^@]*)@(.+)$/.exec(uri);
if (!m) {
  console.error('✗ URI is malformed. Expected mongodb+srv://user:pass@host/...');
  process.exit(1);
}
const [, , user, pwd, host] = m;

if (/PASTE_PASSWORD_HERE|<db_password>|your-?password/i.test(pwd)) {
  console.error('✗ Password is still a placeholder. Put the real one in .env.local.');
  process.exit(1);
}
const risky = [...pwd].filter((c) => '@:/?#[]% '.includes(c));
if (risky.length && !/%[0-9A-Fa-f]{2}/.test(pwd)) {
  console.error(`✗ Password contains characters that must be URL-encoded: ${[...new Set(risky)].join(' ')}`);
  console.error('  @ -> %40   # -> %23   % -> %25   / -> %2F   : -> %3A   ? -> %3F');
  process.exit(1);
}

console.log(`→ user: ${user}  host: ${host.split('/')[0]}  db: ${dbName}`);

const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('✓ Connected and authenticated');

  const count = await client.db(dbName).collection('messages').countDocuments();
  console.log(`✓ messages collection reachable — ${count} document(s)`);
  process.exit(0);
} catch (err) {
  console.error('✗ ' + err.message);
  if (/bad auth|Authentication failed/i.test(err.message)) {
    console.error('  → Wrong username or password. Reset it: Atlas > Database Users > EDIT > Edit Password.');
  } else if (/ETIMEDOUT|ServerSelection|querySrv/i.test(err.message)) {
    console.error('  → Network/DNS issue. Check Atlas > Network Access > IP Access List has your current IP.');
  }
  process.exit(1);
} finally {
  await client.close().catch(() => {});
}
