import { drizzle as drizzleLibSql } from 'drizzle-orm/libsql';
import { drizzle as drizzleD1 } from 'drizzle-orm/d1';
import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';
import { createClient } from '@libsql/client';
import * as schema from './schema';

export function createLibSqlClient(url: string) {
	const client = createClient({ url });
	return drizzleLibSql(client, { schema });
}

export function createD1Client(database: D1Database) {
	return drizzleD1(database, { schema });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DrizzleClient = BaseSQLiteDatabase<'async', any, typeof schema>;
