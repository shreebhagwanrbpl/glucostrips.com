import "server-only";
import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

let database;
export function getSQLiteDb() {
  if (database) return database;
  const configured = process.env.SQLITE_DB_PATH || "../SuperAdminRBPL/data/catalog.db";
  const dbPath = path.isAbsolute(configured) ? configured : path.resolve(process.cwd(), configured);
  if (!fs.existsSync(dbPath)) throw new Error(`SQLite database not found: ${dbPath}`);
  database = new DatabaseSync(dbPath, { readOnly: true });
  database.exec("PRAGMA query_only = ON; PRAGMA read_uncommitted = ON;");
  return database;
}

export function readDocument(documentPath) {
  const row = getSQLiteDb().prepare("SELECT data FROM documents WHERE path = ? LIMIT 1").get(documentPath);
  if (!row?.data) return null;
  try { return JSON.parse(row.data); } catch { return null; }
}

export function readCollection(collectionPath) {
  const rows = getSQLiteDb().prepare("SELECT path, doc_id, data, updated_at FROM documents WHERE collection_path = ? ORDER BY doc_id").all(collectionPath);
  return rows.map((row) => { let data={}; try { data=JSON.parse(row.data || "{}"); } catch {} return { id: row.doc_id, ...data, _path: row.path, _updatedAt: row.updated_at }; });
}
