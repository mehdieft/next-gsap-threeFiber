"use server"
import { redirect } from 'next/navigation' // 👈 این رو اضافه کن!
import prisma  from '@/db';

import sqlite from 'better-sqlite3'
import { revalidatePath } from 'next/cache';
   export async function deleteProduct(productId) {
    console.log("this is id",productId)
       
        // db.prepare(`DELETE FROM products WHERE id=?`).run(productId);
        revalidatePath('/products','page')
    }


   export  const handleSubmit=async(formData)=>{
        "use server";
        console.log("im submit",formData)
        const newProduct={
            name:formData.get('name'),
            price:parseFloat(formData.get('price')),
            image:formData.get('image')
        }
        console.log("this is result",newProduct)
        prisma.products.create({
            data:newProduct
        })
      
       revalidatePath('/products','page')
    }