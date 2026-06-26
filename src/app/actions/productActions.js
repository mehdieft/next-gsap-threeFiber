"use server"
import { prisma } from '../lib/prisma'
import sqlite from 'better-sqlite3'
import { revalidatePath } from 'next/cache';
const db = sqlite('products.sqlite')
export async function deleteProduct(productId) {
    console.log("this is id", productId)

    db.prepare(`DELETE FROM products WHERE id=?`).run(productId);
    insertHandler()

    revalidatePath('/products', 'page')
}
export async function insertHandler(formData) {
    const newProduct = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        image: formData.get('image').name
    }
    await prisma.products.create({
        data: newProduct


    })
    revalidatePath('/products', 'page')

}
