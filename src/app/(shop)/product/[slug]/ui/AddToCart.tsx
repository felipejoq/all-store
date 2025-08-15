'use client'

import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {
    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);

    const addProductToCart = useCartStore(state => state.addProductToCart);

    const addToCart = () => {
        setPosted(true);

        if (!size) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            image: product.images[0],
            price: product.price,
            title: product.title,
            stock: product.inStock,
            quantity: quantity,
            size: size,
        }

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    }

    return (
        <>
            {
                posted && !size && (
                    <span className="text-red-500 mt-4 text-sm fade-in">
                        {/* Mensaje de error */}
                        Debe seleccionar una talla.
                    </span>
                )

            }

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
            <button
                onClick={addToCart}
                className="btn-primary my-5 cursor-pointer"
            >
                Agregar al carrito
            </button>
        </>
    )
}