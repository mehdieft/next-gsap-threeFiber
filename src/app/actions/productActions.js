"use server"
import sqlite from 'better-sqlite3'
const db=sqlite('products.sqlite')
   export async function deleteProduct(productId) {
       
        db.prepare(`DELETE FROM products WHERE id=?`).run(productId);
    }