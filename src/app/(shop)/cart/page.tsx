import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function CartPage() {

    // TODO: Redireccionar si no hay artículos en el carrito.
    // redirect('/empty');

    return (
        <div className="flex justify-center items-center mb-72 px-10 md:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title
                    title="Carrito de compras"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Cart */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Agregar más items</span>
                        <Link href={'/'} className="cursor-pointer underline mb-5">
                            Continuar comprando
                        </Link>


                        {/* Items */}
                        {
                            productsInCart.map(product => (
                                <div key={product.slug} className="flex mb-5">
                                    <Image
                                        src={`/products/${product.images[0]}`}
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
                                        <p>{product.title}</p>
                                        <p className="font-bold">${product.price}</p>
                                        <QuantitySelector quantity={3} />
                                        <button className="cursor-pointer underline">
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout */}

                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Resumen de orden</h2>
                        <div className="grid grid-cols-2 items-center">
                            <span>No. Producto</span>
                            <span className="text-right">3 Productos</span>

                            <span>Subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>Impuestos (19%)</span>
                            <span className="text-right">$ 19</span>

                            <span className="text-2xl mt-5">Total</span>
                            <span className="text-right text-2xl mt-5">
                                $ 100
                            </span>
                        </div>

                        <div className="my-5 w-full">
                            <Link className="flex btn-primary justify-center" href={'/checkout/address'}>
                                Checkout
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}