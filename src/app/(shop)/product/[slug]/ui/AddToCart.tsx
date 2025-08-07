'use client'

import { QuantitySelector, SizeSelector } from "@/components"
import { Product } from "@/interfaces";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    return (
        <>
            {/* Selector de tallas */}
            <SizeSelector
                selectedSize={product.sizes[0]}
                availableSizes={product.sizes}
            />

            {/* Selector de cantidades */}
            <h3 className="font-bold mb-4">Cantidad</h3>
            <QuantitySelector quantity={2} />

            {/* Button add to cart */}
            <button className="btn-primary my-5 cursor-pointer">
                Agregar al carrito
            </button>
        </>
    )
}