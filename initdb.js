const sqlite = require('better-sqlite3');
const db = sqlite('products.sqlite')
db.prepare(`
    CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    image TEXT
    )

    `).run()
// db.prepare(`
//         INSERT INTO products(name,price,image) VALUES('apple',30,'image')
//         `).run()
// db.prepare(`
//         INSERT INTO products(name,price,image) VALUES('orange',320,'image')
//         `).run()
// db.prepare(`
//         INSERT INTO products(name,price,image) VALUES('banana',130,'image')
//         `).run()

const result=db.prepare(`SELECT * FROM products`).all()
console.log('result database',result)