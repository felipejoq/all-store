'use server'

import { prisma } from "@/lib/prisma";
import type { Gender } from "@prisma/client";

interface PaginationOptions {
    gender?: Gender;
    page?: number;
    take?: number;
}

export const getPaginatedProductsWithImages = async ({ gender, page = 1, take = 12 }: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    if (isNaN(Number(take))) take = 12;
    if (take < 1) take = 12;

    try {

        const [totalCount, products] = await prisma.$transaction([
            prisma.product.count({
                where: {
                    gender: gender
                }
            }),
            prisma.product.findMany({
                take: take,
                skip: (page - 1) * take,
                where: {
                    gender: gender
                },
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