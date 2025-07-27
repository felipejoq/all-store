'use server'

import { prisma } from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12 }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    if (isNaN(Number(take))) take = 12;
    if (take < 1) take = 12;

    try {

        const [totalCount, products] = await prisma.$transaction([
            prisma.product.count({}),
            prisma.product.findMany({
                take: take,
                skip: (page - 1) * take,
                include: {
                    ProductImage: {
                        take: 2,
                        select: {
                            url: true,
                        }
                    }
                }
            })
        ]);
        
        const totalPages = Math.ceil(totalCount / take)
        
        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(img => img.url)
            }))
        }

    } catch (error) {
        throw Error(`No se pudo obtener los productos desde la db: ${error}`)
    }
}