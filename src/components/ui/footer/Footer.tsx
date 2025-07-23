import Link from "next/link"
import { IoHeartOutline } from "react-icons/io5"

export const Footer = () => {
    return (
        <div className="flex w-full justify-center gap-2 text-xs mb-10">
            <Link href={'/'} className="flex gap-2 cursor-pointer">
                <span className="font-bold">General </span>
                <span>| Shop </span>
                <span> <IoHeartOutline size={16} /></span>
                <span>{new Date().getFullYear()}</span>
            </Link>
            -
            <Link href={'/'}>
                Privacidad & Legal
            </Link>
-
            <Link href={'/'}>
                Ubicaciones
            </Link>
        </div>
    )
}
