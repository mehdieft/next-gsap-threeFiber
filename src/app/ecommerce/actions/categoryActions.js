'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '../../lib/prisma';
import { deleteImage, uploadImage } from '../../lib/vercelImage';

const categoryPath = '/ecommerce/admin/category';

function getImageFile(formData) {
    const imageFile = formData.get('image');
    return imageFile instanceof File && imageFile.size > 0 ? imageFile : null;
}

export const createCategoryAction = async (formData) => {
    const name = String(formData.get('name') || '').trim();
    const imageFile = getImageFile(formData);

    if (!name || !imageFile) {
        redirect(`${categoryPath}/create?error=` + encodeURIComponent('Name and image are required'));
    }

    try {
        const image = await uploadImage(imageFile);
        await prisma.category.create({ data: { name, image: image.url } });
    } catch (error) {
        redirect(`${categoryPath}/create?error=` + encodeURIComponent(error.message || 'Unable to create category'));
    }

    revalidatePath(categoryPath);
    redirect(`${categoryPath}?success=` + encodeURIComponent('Category created successfully'));
};

export const updateCategoryAction = async (id, formData) => {
    const categoryId = Number(id);
    if (!Number.isInteger(categoryId)) {
        redirect(`${categoryPath}?error=` + encodeURIComponent('Invalid category id'));
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
        redirect(`${categoryPath}?error=` + encodeURIComponent('Category not found'));
    }

    const name = String(formData.get('name') || '').trim();
    const imageFile = getImageFile(formData);
    if (!name) {
        redirect(`${categoryPath}/edit/${categoryId}?error=` + encodeURIComponent('Name is required'));
    }

    try {
        const uploadedImage = imageFile ? await uploadImage(imageFile) : null;
        await prisma.category.update({
            where: { id: categoryId },
            data: {
                name,
                ...(uploadedImage && { image: uploadedImage.url }),
            },
        });

        if (uploadedImage) {
            await deleteImage(category.image);
        }
    } catch (error) {
        redirect(`${categoryPath}/edit/${categoryId}?error=` + encodeURIComponent(error.message || 'Unable to update category'));
    }

    revalidatePath(categoryPath);
    redirect(`${categoryPath}?success=` + encodeURIComponent('Category updated successfully'));
};

export const deleteCategoryAction = async (id) => {
    const categoryId = Number(id);
    if (!Number.isInteger(categoryId)) {
        redirect(`${categoryPath}?error=` + encodeURIComponent('Invalid category id'));
    }

    try {
        const category = await prisma.category.delete({ where: { id: categoryId } });
        await deleteImage(category.image);
    } catch (error) {
        redirect(`${categoryPath}?error=` + encodeURIComponent(error.message || 'Unable to delete category'));
    }

    revalidatePath(categoryPath);
    redirect(`${categoryPath}?success=` + encodeURIComponent('Category deleted successfully'));
};