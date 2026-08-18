import { prisma } from '@/app/lib/prisma';
import Toast from '@/app/components/eccomerce/toast';
import EditProduct from '../EditProduct';

export default async function EditProductPage({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;
  const productId = Number(p.productId);
  const error = sp.error;

  const product = await prisma.products.findUnique({
    where: { id: productId },
    include: {
      images: {
        orderBy: { position: 'asc' },
      },
    },
  });

  if (!product) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
      </div>
    );
  }

  return (
    <>
      {error && <Toast type="error" message={error} />}
      <EditProduct product={product} />
    </>
  );
}
