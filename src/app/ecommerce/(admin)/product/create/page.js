import { createProductAction } from '@/app/ecommerce/actions/productActions';
import Label from '@/app/components/eccomerce/Label/Label';
import Toast from '@/app/components/eccomerce/toast';

export default async function CreateProductPage({ searchParams }) {
  const error = (await searchParams).error;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl shadow-gray-200/50 p-8 md:p-12 transition-all duration-300 hover:shadow-gray-300/50">
        {error && <Toast message={error} type="error" />}

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Product
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Add a new product to your store</p>
        </div>

        <form action={createProductAction} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label required={true} className="text-sm font-semibold text-gray-700">
                Product Name
              </Label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-300"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label required={true} className="text-sm font-semibold text-gray-700">
                Image Path
              </Label>
              <input
                type="text"
                name="image"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-300"
                placeholder="example: images/product-1.jpg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label required={true} className="text-sm font-semibold text-gray-700">
                Price
              </Label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-300"
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label required={true} className="text-sm font-semibold text-gray-700">
                Discount (%)
              </Label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                name="discount"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none hover:border-gray-300"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-[1.01] active:scale-95"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
