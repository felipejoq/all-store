'use client';

import { QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);
    const updateProductsInCart = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);

    useEffect(() => {
        setLoaded(true);
    }, []);


    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />

                        <div>
                            <Link
                                className='hover:underline cursor-pointer'
                                href={`/product/${product.slug}`}
                            >
                                <span className='font-semibold'>{product.size}</span> - {product.title}
                            </Link>
                            <p className="font-bold">${product.price}</p>
                            <QuantitySelector
                                stock={product.stock}
                                quantity={product.quantity}
                                onQuantityChanged={quantity => updateProductsInCart(product, quantity)}
                            />
                            <button
                                onClick={() => removeProduct(product)}
                                className="cursor-pointer underline"
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
