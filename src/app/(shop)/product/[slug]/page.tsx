import { ProductMobileSlideshow, ProductSlideShow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {

    const { slug } = await params;

    const product = initialData.products.find(product => product.slug === slug);

    if (!product) {
        notFound();
    }



    return (
        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
            {/* Slideshow */}
            <div className="col-span-1 md:col-span-2">

                {/* Mobile Slideshow */}
                <ProductMobileSlideshow
                    title={product.title}
                    images={product.images}
                    className="block md:hidden"
                />

                {/* Desktop Slideshow */}
                <ProductSlideShow
                    title={product.title}
                    images={product.images}
                    className="hidden md:block"
                />
            </div>
            {/* Details */}
            <div className="col-span-1 px-5">
                <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                    {product.title}
                </h1>
                <p className="text-lg mb-5">${product.price}</p>

                {/* Selector de tallas */}
                <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

                {/* Selector de cantidades */}
                <h1 className="font-bold mb-4">Cantidad</h1>
                <QuantitySelector quantity={2} />

                {/* Button add to cart */}
                <button className="btn-primary my-5 cursor-pointer">
                    Agregar al carrito
                </button>

                {/* Description */}
                <h3 className="font-bold text-sm">
                    Descripción
                </h3>
                <p className="font-light">
                    {product.description}
                </p>
            </div>
        </div>
    );
}