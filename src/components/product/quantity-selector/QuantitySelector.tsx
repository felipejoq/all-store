'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
    quantity: number;
    stock: number;
    onQuantityChanged: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, stock, onQuantityChanged }: Props) => {


    const onValueChanged = (value: number) => {
        if (quantity + value < 1 || quantity + value > stock) return;
        onQuantityChanged(quantity + value);
    }

    return (
        <div className="my-5">
            <div className="flex items-center">
                <button
                    onClick={() => onValueChanged(-1)}
                    className="cursor-pointer"
                >
                    <IoRemoveCircleOutline size={30} />
                </button>
                <span className="w-20 mx-3 px-5 py-1 bg-gray-200 text-center rounded">
                    {quantity}
                </span>
                <button
                    onClick={() => onValueChanged(1)}
                    className="cursor-pointer"
                >
                    <IoAddCircleOutline size={30} />
                </button>
            </div>
        </div>
    )
}
