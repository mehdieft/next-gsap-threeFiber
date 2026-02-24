

import Link from "next/link"
import getProducts from '../../../database/products'

export default async function Products() {


  const userss=getProducts()
  
     
    




  return (
    <>
      <h1>this is products page.</h1>

      <div className="flex justify-center gap-8 ">
        <Link href="/products/apple">apple</Link>
        <Link href="/products/orange">orange</Link>
        <Link href="/products/banana">banana</Link>
      </div>

      {userss.map((user) => (
        <div className="mx-12" key={user.id}>
       <Link href={"products/"+user.name}>{user.name}</Link>
        </div>
      ))}
    </>
  )
}
