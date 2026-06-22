

import Link from "next/link"
import getProducts from '../../../database/products'
import ProductCard from "../components/ProductCard"
import sqlite from 'better-sqlite3'
const db=sqlite('products.sqlite')

// export const dynamic="force-dynamic"
// export const revalidate=10
export default async function Products() {


  const products = getProducts()
  console.log("this is products",products)







  return (
    <>
      <div className="grid grid-cols-4 gap-y-12 gap-x-24 mx-24 my-12">

        {products.map((prod) => {
          return (
            <ProductCard key={prod.id} product={prod}  />
          )
        })}
      </div>


    </>
  )
}
