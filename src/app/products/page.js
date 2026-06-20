

import Link from "next/link"
import getProducts from '../../../database/products'
import ProductCard from "../components/ProductCard"


export default async function Products() {


  const products = getProducts()
 







  return (
    <>
      <div className="grid grid-cols-4 gap-y-12 gap-x-24 mx-24 my-12">

        {products.map((prod) => {
          return (
            <ProductCard product={prod} key={prod.id} />
          )
        })}
      </div>


    </>
  )
}
