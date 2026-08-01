'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../../lib/prisma';

function parseNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export const createProductAction = async (formData) => {
  const name = String(formData.get('name') || '').trim();
  const image = String(formData.get('image') || '').trim();
  const price = parseNumber(formData.get('price'));
  const discount = parseNumber(formData.get('discount'));

  if (!name || !image) {
    redirect('/ecommerce/product/create?error=' + encodeURIComponent('Name and image are required'));
  }

  if (Number.isNaN(price) || price < 0) {
    redirect('/ecommerce/product/create?error=' + encodeURIComponent('Price must be a valid positive number'));
  }

  if (Number.isNaN(discount) || discount < 0 || discount > 100) {
    redirect('/ecommerce/product/create?error=' + encodeURIComponent('Discount must be between 0 and 100'));
  }

  await prisma.products.create({
    data: {
      name,
      image,
      price,
      discount,
    },
  });

  revalidatePath('/ecommerce/product');
  redirect('/ecommerce/product?success=' + encodeURIComponent('Product created successfully'));
};

export const updateProductAction = async (id, formData) => {
  const productId = Number(id);
  if (!Number.isInteger(productId)) {
    redirect('/ecommerce/product?error=' + encodeURIComponent('Invalid product id'));
  }

  const exists = await prisma.products.findUnique({ where: { id: productId } });
  if (!exists) {
    redirect('/ecommerce/product?error=' + encodeURIComponent('Product not found'));
  }

  const name = String(formData.get('name') || '').trim();
  const image = String(formData.get('image') || '').trim();
  const price = parseNumber(formData.get('price'));
  const discount = parseNumber(formData.get('discount'));

  if (!name || !image) {
    redirect(`/ecommerce/product/edit/${productId}?error=` + encodeURIComponent('Name and image are required'));
  }

  if (Number.isNaN(price) || price < 0) {
    redirect(`/ecommerce/product/edit/${productId}?error=` + encodeURIComponent('Price must be a valid positive number'));
  }

  if (Number.isNaN(discount) || discount < 0 || discount > 100) {
    redirect(`/ecommerce/product/edit/${productId}?error=` + encodeURIComponent('Discount must be between 0 and 100'));
  }

  await prisma.products.update({
    where: { id: productId },
    data: {
      name,
      image,
      price,
      discount,
    },
  });

  revalidatePath('/ecommerce/product');
  redirect('/ecommerce/product?success=' + encodeURIComponent('Product updated successfully'));
};

export const deleteProductAction = async (id) => {
  const productId = Number(id);
  if (!Number.isInteger(productId)) {
    redirect('/ecommerce/product?error=' + encodeURIComponent('Invalid product id'));
  }

  await prisma.products.delete({ where: { id: productId } });
  revalidatePath('/ecommerce/product');
  redirect('/ecommerce/product?success=' + encodeURIComponent('Product deleted successfully'));
};
