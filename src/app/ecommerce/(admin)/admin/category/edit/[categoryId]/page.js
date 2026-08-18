import { prisma } from '@/app/lib/prisma';
import { updateCategoryAction } from '@/app/ecommerce/actions/categoryActions';
import Label from '@/app/components/eccomerce/Label/Label';
import Toast from '@/app/components/eccomerce/toast';

export default async function EditCategoryPage({ params, searchParams }) {
  const { categoryId } = await params;
  const { error } = await searchParams;
  const category = await prisma.category.findUnique({ where: { id: Number(categoryId) } });

  if (!category) {
    return <div className="p-8 text-red-600">Category not found</div>;
  }

  return (
    <div className="mx-auto w-full max-w-xl py-8">
      {error && <Toast message={error} type="error" />}
      <div className="border border-gray-200 bg-white p-6 shadow-sm rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">Edit Category</h1>
        <form action={updateCategoryAction.bind(null, category.id)} encType="multipart/form-data" className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label required className="text-sm font-semibold text-gray-700">Category Name</Label>
            <input name="name" type="text" defaultValue={category.name} required className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Replace Category Image</Label>
            <input name="image" type="file" accept="image/*" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Update Category</button>
        </form>
      </div>
    </div>
  );
}