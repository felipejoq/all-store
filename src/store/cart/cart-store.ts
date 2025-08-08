import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[],

    addProductToCart: (product: CartProduct) => void;
    // updateProductQuantity
    // removeProduct
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            // Propiedades
            cart: [],
            // Métodos
            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                // 1. Revisamos si el producto con la talla ya existe en el carrito.
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // 2. El producto existe por ID y Talla, se debe incrementar.
                const updatedCartProduct = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        }
                    }
                    return item;
                });

                set({
                    cart: updatedCartProduct
                })

            }
        }),
        {
            name: "shoping-cart"
        }
    )
)