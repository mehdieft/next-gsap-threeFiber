
import sqlite from 'better-sqlite3' 
import { redirect } from 'next/navigation' // 👈 این رو اضافه کن!
import {insertHandler} from '../actions/productActions'


const db=sqlite('products.sqlite')
export default function AddProduct() {
    // const handleSubmit=async(formData)=>{
    //     "use server";
    //     console.log("im submit",formData)
    //     const newProduct={
    //         name:formData.get('name'),
    //         price:formData.get('price'),
    //         image:formData.get('image')
    //     }
    //     console.log("this is result",newProduct)
    //     db.prepare(
    //         `INSERT INTO products(name,price,image) VALUES(?,?,?)`
    //     ).run(newProduct.name,newProduct.price,newProduct.image.name)
    //     redirect('/products')
    // }
    return (
        <>
            <div className="flex justify-center py-10 text-black">
                <div className="w-4/9 bg-white shadow-2xl p-8 gap-8 flex flex-col">
                <form action={insertHandler}>

                    <h1 className="text-2xl text-black font-bold ">Add Produt </h1>
                    <div className="h-px bg-black" />
                    <div className="flex flex-row justify-between mt-10 gap-2">
                        <div>
                            <label>product name</label>
                            <input name="name" className="p-2 border w-full rounded-sm shadow-xl" type="text" placeholder="E.g Fruit" />
                        </div>
                        <div>
                            <label>product price</label>
                            <input name="price" className="p-2 border w-full" type="number" placeholder="$price" />
                        </div>
                    </div>
                    <div className="p-5 border flex shadow-xl mt-10">
                        <label className="block"></label>
                        <input name="image" type="file" className="block w-full text-md text-slate-700 file:mr-4 file:py-2 
                        file:px-4 file:rounded-full file:bg-indigo-500 hover:file:bg-indigo-300 hover:file:cursor-pointer" />
                    </div>
                    <div className="pt-10">
                        <button className="px-4 bg-indigo-400 p-2 rounded-full">save</button>
                        <button className="px-4">cancel</button>
                    </div>
                        </form>
                </div>
            </div>

        </>
    )
}
