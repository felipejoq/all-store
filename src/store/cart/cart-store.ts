import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[],
    getTotalItems: () => number;
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    }
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            // Propiedades
            cart: [],
            // Métodos
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => {
                    return total + item.quantity
                }, 0);
            },
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

            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const cartUpdated = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: quantity,
                        }
                    }
                    return item;
                });

                set({
                    cart: cartUpdated
                });
            },
            removeProduct: (product: CartProduct) => {
                const { cart } = get();

                const updatedCartProducts = cart.filter(item => (item.id !== product.id || item.size !== product.size));

                set({
                    cart: updatedCartProducts
                })
            },
            getSummaryInformation: () => {
                const { cart } = get();

                const subTotal = cart.reduce((subTotal, product) => {
                    return (product.quantity * product.price) + subTotal;
                }, 0);

                const tax = subTotal * 0.19;

                const total = subTotal + tax;

                const itemsInCart = cart.reduce((total, item) => {
                    return total + item.quantity
                }, 0);

                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart
                }

            }
        }),
        {
            name: "shopping-cart"
        }
    )
)