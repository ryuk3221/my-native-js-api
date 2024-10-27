import { Database } from "sqlite3";
import { db } from "../database";
import { ItemsModelProps, ItemProps, ItemUpdateProps } from './types';

export default class ItemsModel implements ItemsModelProps {
  database: Database;
  changes: ItemProps;

  constructor({ database }) {
    this.database = database
  }

  get all() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
          reject(err);

          return;
        }

        resolve(rows);
      })
    });
  }

  getItem(id: number) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM items WHERE id=?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  create({ name, description }: ItemProps) {
    new Promise((resolve, reject) => {
      db.run('INSERT INTO items(name, description) VALUES(?, ?)', [name, description], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  update({ id, description, name }: ItemUpdateProps) {
    return new Promise((resolve, reject) => {
      db.run('UPDATE items SET name=?, description=? WHERE id=?', [name, description, id], err => {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM items WHERE id=?', [id], err => {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}
