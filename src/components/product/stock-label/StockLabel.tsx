'use client'

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
    slug: string
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStcok();
    }, [slug])

    const getStcok = async () => {
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
        setIsLoading(false);
    }

    return (
        <div className="mb-2">
            {
                isLoading ? (
                    <h3 className={`${titleFont.className} antialiased font-bold text-sm animate-pulse bg-gray-200 rounded`}>
                        &nbsp;
                    </h3>
                ) : (
                    <h3 className={`${titleFont.className} antialiased font-bold text-sm`}>
                        Stock: {stock}
                    </h3>
                )
            }
        </div>
    )
}
