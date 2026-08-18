'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../../lib/prisma';
import { deleteImage, uploadImage } from '../../lib/vercelImage';

function parseNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function getImageFiles(formData) {
  return formData
    .getAll('images')
    .filter((file) => file instanceof File && file.size > 0);
}

async function uploadImages(files) {
  const uploadedImages = await Promise.all(files.map(uploadImage));
  return uploadedImages.map((image) => image.url);
}

async function deleteUploadedImages(urls) {
  await Promise.all(urls.map(deleteImage));
}

export const createProductAction = async (formData) => {
  const name = String(formData.get('name') || '').trim();
  const imageFiles = getImageFiles(formData);
  const price = parseNumber(formData.get('price'));
  const discount = parseNumber(formData.get('discount'));

  if (!name || imageFiles.length === 0) {
    redirect('/ecommerce/admin/product/create?error=' + encodeURIComponent('Name and at least one image are required'));
  }

  if (Number.isNaN(price) || price < 0) {
    redirect('/ecommerce/admin/product/create?error=' + encodeURIComponent('Price must be a valid positive number'));
  }

  if (Number.isNaN(discount) || discount < 0 || discount > 100) {
    redirect('/ecommerce/admin/product/create?error=' + encodeURIComponent('Discount must be between 0 and 100'));
  }

  try {
    const imageUrls = await uploadImages(imageFiles);

    await prisma.products.create({
      data: {
        name,
        price,
        discount,
        images: {
          create: imageUrls.map((url, position) => ({ url, position })),
        },
      },
    });
  } catch (error) {
    redirect('/ecommerce/admin/product/create?error=' + encodeURIComponent(error.message || 'Unable to upload product images'));
  }

  revalidatePath('/ecommerce/product');
  redirect('/ecommerce/admin/product?success=' + encodeURIComponent('Product created successfully'));
};

export const updateProductAction = async (id, formData) => {
  const productId = Number(id);
  if (!Number.isInteger(productId)) {
    redirect('/ecommerce/admin/product?error=' + encodeURIComponent('Invalid product id'));
  }

  const exists = await prisma.products.findUnique({
    where: { id: productId },
    include: { images: true },
  });
  if (!exists) {
    redirect('/ecommerce/admin/product?error=' + encodeURIComponent('Product not found'));
  }

  const name = String(formData.get('name') || '').trim();
  const imageFiles = getImageFiles(formData);
  const price = parseNumber(formData.get('price'));
  const discount = parseNumber(formData.get('discount'));

  if (!name) {
    redirect(`/ecommerce/admin/product/edit/${productId}?error=` + encodeURIComponent('Name is required'));
  }

  if (Number.isNaN(price) || price < 0) {
    redirect(`/ecommerce/admin/product/edit/${productId}?error=` + encodeURIComponent('Price must be a valid positive number'));
  }

  if (Number.isNaN(discount) || discount < 0 || discount > 100) {
    redirect(`/ecommerce/admin/product/edit/${productId}?error=` + encodeURIComponent('Discount must be between 0 and 100'));
  }

  try {
    const imageUrls = imageFiles.length > 0 ? await uploadImages(imageFiles) : null;

    await prisma.products.update({
      where: { id: productId },
      data: {
        name,
        price,
        discount,
        ...(imageUrls && {
          images: {
            deleteMany: {},
            create: imageUrls.map((url, position) => ({ url, position })),
          },
        }),
      },
    });

    if (imageUrls) {
      await deleteUploadedImages(exists.images.map((image) => image.url));
    }
  } catch (error) {
    redirect(`/ecommerce/admin/product/edit/${productId}?error=` + encodeURIComponent(error.message || 'Unable to update product'));
  }

  revalidatePath('/ecommerce/admin/product');
  redirect('/ecommerce/admin/product?success=' + encodeURIComponent('Product updated successfully'));
};

export const deleteProductAction = async (id) => {
  const productId = Number(id);
  if (!Number.isInteger(productId)) {
    redirect('/ecommerce/admin/product?error=' + encodeURIComponent('Invalid product id'));
  }

  const product = await prisma.products.delete({
    where: { id: productId },
    include: { images: true },
  });
  await deleteUploadedImages(product.images.map((image) => image.url));
  revalidatePath('/ecommerce/product');
  redirect('/ecommerce/admin/product?success=' + encodeURIComponent('Product deleted successfully'));
};
