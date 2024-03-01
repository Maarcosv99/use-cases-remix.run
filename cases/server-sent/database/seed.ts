import sqlite3 from 'sqlite3'

export const db = new sqlite3.Database('./database.db');
/*
  Message {
    id: number
    content: string
  }
*/

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, content TEXT)")

  const stmt = db.prepare("INSERT INTO messages (content) VALUES (?)")
  stmt.run("Hello, world!")
  stmt.finalize()

  db
})

db.close()