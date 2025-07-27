import { prisma } from '../lib/prisma';
import { initialData } from './seed'


async function main() {

    const { categories, products } = initialData;

    // Reset de las tablas
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // Inseta las categorías
    const categoriesDb = await prisma.category.createManyAndReturn({
        data: [
            ...categories.map(name => {
                return {
                    name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
                }
            })
        ]
    });

    const categoriesMap = categoriesDb.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id
        return map;
    }, {} as Record<string, string>);

    // Crear productos
    products.forEach(async (product) => {
        const {
            type,
            images,
            ...rest
        } = product;

        const productDb = await prisma.product.create({
            data: { ...rest, categoryId: categoriesMap[type] }
        });

        // Prepara las imagenes
        const imagesData = images.map(image => ({ url: image, productId: productDb.id }));

        await prisma.productImage.createMany({ data: imagesData })
    });

    return 'Seed sembrada'
}

(async () => {
    if (process.env.NODE_ENV === 'production') return;

    await main()
        .then(console.log)
})()