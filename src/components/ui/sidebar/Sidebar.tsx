'use client';

import Link from "next/link";
import clsx from "clsx";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

import { useUIStore } from "@/store";

export const Sidebar = () => {

    const isSiteMenuOpen = useUIStore(state => state.isSiteMenuOpen);
    const closeSiteMenu = useUIStore(state => state.closeSiteMenu);

    return (
        <div>
            {/* Background black */}
            {
                isSiteMenuOpen && (
                    <div
                        className="fixed top-0 left-0 h-screen w-screen z-10 bg-black opacity-20"
                    />
                )
            }


            {/* Background blur */}
            {
                isSiteMenuOpen && (
                    <div
                        onClick={closeSiteMenu}
                        className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
                )
            }

            {/* Sidemenu */}
            <nav className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSiteMenuOpen
                    }
                )
            }>
                <IoCloseOutline
                    size={30}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={closeSiteMenu}
                />

                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Menú */}

                <Link
                    href={"/"}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoPersonOutline size={20} />
                    <span className="ml-3 text-lg">Perfil</span>
                </Link>

                <Link
                    href={"/"}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoTicketOutline size={20} />
                    <span className="ml-3 text-lg">Ordenes</span>
                </Link>

                <Link
                    href={"/"}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoLogInOutline size={20} />
                    <span className="ml-3 text-lg">Ingresar</span>
                </Link>

                <Link
                    href={"/"}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoLogOutOutline size={20} />
                    <span className="ml-3 text-lg">
                        Salir
                    </span>
                </Link>

                {/* Line separator */}
                <div className="w-full h-px bg-gray-200 my-10"></div>

                <Link
                    href={"/"}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoShirtOutline size={20} />
                    <span className="ml-3 text-lg">
                        Productos
                    </span>
                </Link>

                <Link
                    href={"/"}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoTicketOutline size={20} />
                    <span className="ml-3 text-lg">
                        Ordenes
                    </span>
                </Link>

                <Link
                    href={"/"}
                    className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                >
                    <IoPeopleOutline size={20} />
                    <span className="ml-3 text-lg">
                        Clientes
                    </span>
                </Link>

            </nav>
        </div>
    )
}
