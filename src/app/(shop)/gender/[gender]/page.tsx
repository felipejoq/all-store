import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import type { Gender } from "@/interfaces";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ gender: string }>;
    searchParams: Promise<{ page?: string }>;
}

const labels: Record<string, string> = {
    women: "Mujeres",
    men: "Hombres",
    kid: "Niños",
    unisex: "Unisex"
}

export default async function CategoryPage({ params, searchParams }: Props) {

    const { page } = await searchParams;
    const { gender } = await params;

    const pageNumber = page ? parseInt(page) : 1;
    const genderLabel = labels[gender];

    const { products, totalPages } = await getPaginatedProductsWithImages({
        page: pageNumber,
        gender: gender as Gender,
    });


    if (products.length === 0) {
        redirect(`/gender/${gender}`)
    }

    return (
        <>
            <Title
                title={`Artículos de ${genderLabel}`}
                subtitle={`Todos los artículos de ${genderLabel}`}
                className="mb-2"
            />

            <ProductGrid
                products={products}
            />

            <Pagination
                totalPages={totalPages}
            />
        </>
    );
}