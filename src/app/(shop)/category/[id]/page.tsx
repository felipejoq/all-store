import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: Category }>
}

const labels: Record<Category, string> = {
    women: "Mujeres",
    men: "Hombres",
    kid: "Niños",
    unisex: "Unisex"
}

const products = initialData.products;

export default async function CategoryPage({ params }: Props) {

    const { id } = await params;

    if(!labels[id]) {
        notFound()
    }

    const productsFiltered = products.filter(product => product.gender === id)


    return (
        <>
            <Title
                title={`Artículos de ${labels[id]}`}
                subtitle={`Todos los artículos de ${labels[id]}`}
                className="mb-2"
            />

            <ProductGrid products={productsFiltered} />
        </>
    );
}