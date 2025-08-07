'use client'

import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <>
            {/* Selector de tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
            />

            {/* Selector de cantidades */}
            <h3 className="font-bold mb-4">Cantidad</h3>
            <QuantitySelector
                stock={product.inStock}
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {/* Button add to cart */}
            <button className="btn-primary my-5 cursor-pointer">
                Agregar al carrito
            </button>
        </>
    )
}