'use server'

import { prisma } from "@/lib/prisma"

export const getPaginatedProductsWithImages = async () => {
    try {
        const products = await prisma.product.findMany({
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            }
        });

        return {
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(img => img.url)
            }))
        }

    } catch (error) {
        throw Error(`No se pudo obtener los productos desde la db: ${error}`)
    }
}