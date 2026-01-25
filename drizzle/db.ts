import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import { join } from 'path';

const sqlite = new Database(join(process.cwd(), 'sqlite.db'));
export const db = drizzle(sqlite, { schema });
