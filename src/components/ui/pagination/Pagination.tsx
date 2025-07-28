'use client';

import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();
    const pageString = searchParams.get('page') ?? 1;
    const pageStringIsNaN = isNaN(Number(pageString));
    const currentPage = pageStringIsNaN ? 1 : Number(pageString);

    if (currentPage < 1 || pageStringIsNaN) {
        redirect(pathName)
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages)

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathName}?${params.toString()}`;
        }

        if (Number(pageNumber) <= 0) {
            return `${pathName}`;
        }

        if (Number(pageNumber) > totalPages) {
            return `${pathName}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString())

        return `${pathName}?${params.toString()}`;
    }

    return (
        <div className="flex justify-center text-center my-16">
            <nav aria-label="Page navigation">
                <ul className="flex gap-2 list-style-none">
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}
                        >
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>
                    {
                        allPages.map((page, index) => (
                            <li className="page-item" key={`${page}-${index}`}>
                                <Link
                                    className={
                                        clsx(
                                            "page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                            {
                                                "bg-blue-600 text-white shadow-sm": currentPage === page
                                            }
                                        )
                                    }
                                    href={createPageUrl(page)}
                                >
                                    {page}
                                </Link>
                            </li>
                        ))
                    }
                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}
                        >
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
