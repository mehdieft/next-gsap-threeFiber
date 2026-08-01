import Link from 'next/link';
import { prisma } from '@/app/lib/prisma';
import Toast from '@/app/components/eccomerce/toast';
import { deleteProductAction } from '../../actions/productActions';

export default async function ProductPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params.page, 10) || 1;
  const pageSize = 10;
  const success = params.success;
  const error = params.error;

  const products = await prisma.products.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { createdAt: 'desc' },
  });

  const total = await prisma.products.count();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="p-8">
      {success && <Toast type="success" message={success} />}
      {error && <Toast type="error" message={error} />}

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
          <p className="text-gray-600 mt-2">
            Total Products: <span className="font-semibold text-blue-600">{total}</span>
          </p>
        </div>
        <Link
          className="px-4 py-2 rounded-md hover:bg-green-700 hover:text-white duration-300 bg-green-400"
          href="/ecommerce/product/create"
        >
          create product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-linear-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Discount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Created At</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{(page - 1) * pageSize + index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.discount}%</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.image}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(product.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link className="text-blue-600 hover:text-blue-900 font-semibold px-3" href={`/ecommerce/product/edit/${product.id}`}>
                      Edit
                    </Link>
                    <form className="inline" action={deleteProductAction.bind(null, product.id)}>
                      <button type="submit" className="text-red-500 hover:cursor-pointer hover:text-red-900 font-semibold">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
        </div>
        <div className="flex gap-2">
          {page > 1 ? (
            <Link href={`?page=${page - 1}`} className="px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700">
              Previous
            </Link>
          ) : (
            <button disabled className="px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-400 cursor-not-allowed">
              Previous
            </button>
          )}

          {page < totalPages ? (
            <Link href={`?page=${page + 1}`} className="px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700">
              Next
            </Link>
          ) : (
            <button disabled className="px-4 py-2 rounded-lg font-semibold bg-gray-200 text-gray-400 cursor-not-allowed">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
