import { useLocation } from "react-router-dom"
import { BrandLink } from "./BrandLink"
import { LucideIcon } from "lucide-react"

type Props = {
    url: string,
    base?: string,
    children: React.ReactNode
    icon: LucideIcon
}

export const ItemTypeLink = ({ url, base = url, children, icon: Icon }: Props) => {

    const { pathname } = useLocation()

    return <BrandLink to={`${url}?status=active`} className={`px-4 py-1.5 rounded-md bg-stone-100 flex items-center gap-3 ${pathname.includes(base)
        ? "bg-stone-900 text-white"
        : "hover:bg-stone-200"
        }`} key={url}>
        <Icon className={`size-4 ${pathname.includes(base) ? "stroke-white" : ""}`} />
        {children}
    </BrandLink>
}