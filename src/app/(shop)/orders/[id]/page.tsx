import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackCircleOutline, IoCardOutline } from "react-icons/io5";

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

interface Props {
    params: Promise<{ id: string }>
}

export default async function OrderPage({ params }: Props) {

    const { id } = await params;

    // TODO: Verificar políticas para ver orden.

    return (
        <div className="flex justify-center items-center mb-72 px-10 md:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title
                    title={`Orden #${id}`}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Cart */}
                    <div className="flex flex-col mt-5">
                        <div className={
                            clsx(
                                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                {
                                    'bg-red-500': true,
                                    'bg-green-700': false
                                }
                            )
                        }>
                            <IoCardOutline size={30} />
                            <span className="mx-2">Pendiente de pago</span>
                            {/* <span className="mx-2">Orden pagada</span> */}
                        </div>

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
                                        <p className="font-bold">${product.price} x 3</p>
                                        <p className="font-bold">Subtotal: ${product.price * 3}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout */}

                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">Felipe Jofré Quevedo</p>
                            <p>Av. B. O'Higgins 123</p>
                            <p>Prov. Diguillín, Ñuble</p>
                            <p>Cod. Postal 3780000</p>
                            <p>Tel. +56 9 8888 8888</p>
                        </div>

                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

                        <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>
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
                            <div className={
                                clsx(
                                    "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                    {
                                        'bg-red-500': true,
                                        'bg-green-700': false
                                    }
                                )
                            }>
                                <IoCardOutline size={30} />
                                <span className="mx-2">Orden por pagar</span>
                                {/* <span className="mx-2">Orden pagada</span> */}
                            </div>
                        </div>
                        <Link href={'/orders'} className="text-xs hover:underline cursor-pointer flex gap-2 my-5">
                            <IoArrowBackCircleOutline size={16} />
                            <span>Listado de ordenes</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}