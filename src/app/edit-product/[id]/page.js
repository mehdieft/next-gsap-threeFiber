
import sqlite from 'better-sqlite3'
const db = sqlite('products.sqlite')
export default async function EditProduct({ params }) {
  const { id } = await params
  console.log("this is params", id)
  const [product] = db.prepare(`SELECT * FROM products WHERE id=?`).all(id)
  console.log("this is product", product)




  const handleSubmit = async (formData) => {
    "use server";
    console.log("im submit", formData)

    const name = formData.get('name')
    const price = formData.get('price')
    const imageFile = formData.get('image')

    // If no new image, keep the existing one from database
    let imageName = product.image

    // Only update image if a new file was uploaded
    if (imageFile && imageFile.size > 0) {
      // You need to save the file here
      // For now, just use the filename (not recommended)
      imageName = imageFile.name
      console.log("⚠️ Warning: Image file not actually saved to disk")
    }

    console.log("Updating product:", { name, price, imageName })

    db.prepare(`UPDATE products SET name=?, price=?, image=? WHERE id=?`)
      .run(name, price, imageName, id)
  }
  return (
    <>
      <div className="flex justify-center py-10 text-black">
        <div className="w-4/9 bg-white shadow-2xl p-8 gap-8 flex flex-col">
          <form action={handleSubmit}>

            <h1 className="text-2xl text-black font-bold ">Edit Produt </h1>
            <div className="h-px bg-black" />
            <div className="flex flex-row justify-between mt-10 gap-2">
              <div>
                <label>product name</label>
                <input name="name" defaultValue={product.name} className="p-2 border w-full rounded-sm shadow-xl" type="text" placeholder="E.g Fruit" />
              </div>
              <div>
                <label>product price</label>
                <input name="price" defaultValue={product.price} className="p-2 border w-full" type="number" placeholder="$price" />
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
