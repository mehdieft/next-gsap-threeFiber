

import Link from "next/link"


export default async function Products() {


  
    const users =  await fetch('https://jsonplaceholder.typicode.com/users')
      const userss = await users.json()
     
    




  return (
    <>
      <h1>this is products page.</h1>

      <div className="flex justify-center gap-8">
        <Link href="/products/apple">apple</Link>
        <Link href="/products/orange">orange</Link>
        <Link href="/products/banana">banana</Link>
      </div>

      {userss.map((user) => (
        <div key={user.id}>
        <h1 >{user.name}</h1>
        </div>
      ))}
    </>
  )
}
