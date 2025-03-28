import { SearchBar } from "../components/filters/SearchBar"
import { Beef, CookingPot, Layers3, Plus, Salad } from "lucide-react"
import { StatusFilter } from "../components/filters/StatusFilter"
import { DownloadButton } from "../components/DownloadButton"
import { CategoriesList } from "../components/CategoriesList"
import { getItemSubtypeName, getItemTypeName, getSubtypesByType } from "../utils/items"
import { ItemTypeEnum } from "../utils/types"
import { ItemsTable } from "../components/ItemsTable"
import { BrandLink } from "../components/BrandLink"
import { useParams } from "react-router-dom"
import { ItemTypeLink } from "../components/ItemTypeLink"
import { SubtypeFilter } from "../components/filters/SubtypeFilter"
import { PageHeader } from "../components/ui/PageHeader"
import { PageTitle } from "../components/ui/PageTitle"

export const ItemsPage = () => {

    const { type } = useParams<{ type: ItemTypeEnum }>()

    return <>
        <title>SISTEMA - Gestión de ítems</title>
        <section className="">
            <PageHeader>
                <div className="flex items-center gap-6">
                    <PageTitle>Ítems</PageTitle>
                    <nav className="flex items-center gap-3 text-sm">
                        <ItemTypeLink url="/items/products" icon={Salad} >Productos</ItemTypeLink>
                        <ItemTypeLink url="/items/combos" icon={Layers3} >Combos</ItemTypeLink>
                        <ItemTypeLink url="/items/supplies" icon={Beef} >Insumos</ItemTypeLink>
                        <ItemTypeLink url="/items/base-recipes" icon={CookingPot} >Recetas base</ItemTypeLink>
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <DownloadButton />
                    <BrandLink to={`/items/${type}/new`} className={`bg-gradient-to-br from-orange-500 to-orange-600 border-orange-600 rounded-md px-2.5 sm:px-4 py-1.5 flex items-center gap-2 min-w-max shadow-sm text-sm text-white font-medium`}><Plus className="size-4 stroke-white stroke-[3px]" />{`Crear ${getItemTypeName(type!).toLowerCase()}`}</BrandLink>
                </div>
            </PageHeader>
            <div className="flex items-center justify-between border rounded-md p-4">
                <div className="flex items-center gap-5">
                    <nav className="flex items-center gap-3 text-sm">
                        <SubtypeFilter value={null} >Todo</SubtypeFilter>
                        {getSubtypesByType(type!).map(subtype => <SubtypeFilter value={subtype} >{getItemSubtypeName(subtype)}</SubtypeFilter>)}
                    </nav>
                </div>
                <div className="flex items-center gap-3">
                    <StatusFilter />
                    <SearchBar placeholder={`Buscar ${getItemTypeName(type!).toLowerCase()}`} />
                </div>
            </div>
            <div className="flex mt-4 gap-4">
                <CategoriesList />
                <ItemsTable />
            </div>
        </section>
    </>
}