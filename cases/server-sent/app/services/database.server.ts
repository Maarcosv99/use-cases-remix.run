import sqlite3 from 'sqlite3'

export const db = new sqlite3.Database('./database.db');

export interface Message {
  id: string
  content: string
}

export const database = {
  messages: {
    findAll: async (): Promise<Message[]> => new Promise((resolve) => {
      db.all<Message>("SELECT * FROM messages", (err, rows) => {
        if (err)  throw err
        resolve(rows)
      })
    }),
    create: async (message: string): Promise<Message> => new Promise((resolve, reject) => {
      db.run("INSERT INTO messages (content) VALUES (?)", message, (err) => {
        if (err) reject(err)
        db.get<Message>("SELECT * FROM messages WHERE id = last_insert_rowid()", (err, row) => {
          if (err) reject(err)
          resolve(row)
        })
      })
    })
  }
}