export type MessagePayload = {
  name?: string | null;
  message: string;
  source?: 'main' | 'secret';
};

export type MessageInsertResult = {
  stored: boolean;
  id?: number;
  name?: string | null;
  message: string;
  source: string;
  created_at?: string;
};

function hasPostgres() {
  return Boolean(process.env.POSTGRES_URL);
}

async function getSql() {
  const mod = await import('@vercel/postgres');
  return mod.sql;
}

export async function ensureMessagesTable() {
  if (!hasPostgres()) {
    return false;
  }

  const sql = await getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name TEXT,
      message TEXT NOT NULL,
      source TEXT DEFAULT 'main',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;

  return true;
}

export async function insertMessage({ name, message, source = 'main' }: MessagePayload): Promise<MessageInsertResult> {
  const enabled = await ensureMessagesTable();

  if (!enabled) {
    return {
      stored: false,
      name: name ?? null,
      message,
      source,
      created_at: new Date().toISOString()
    };
  }

  const sql = await getSql();

  const result = await sql<{
    id: number;
    name: string | null;
    message: string;
    source: string;
    created_at: string;
  }>`
    INSERT INTO messages (name, message, source)
    VALUES (${name ?? null}, ${message}, ${source})
    RETURNING id, name, message, source, created_at;
  `;

  return {
    stored: true,
    ...result.rows[0]
  };
}
      
