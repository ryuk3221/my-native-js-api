import { Database, verbose } from "sqlite3";

if (process.env.DEBUG) {
  verbose();
}

export const db = new Database('memory', (err) => {
  if (err) {
    console.error(err.message);
  }

  console.log('Connected to sqli3 db');
});

db.serialize(() => {
  //db.run - выполнение sql запроса
  db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT)');
});
