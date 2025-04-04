import { useEffect } from "react"
import { getItemSubtypeName, getSubtypesByType } from "../utils/items"
import { FullItemType, ItemSubtypeEnum, UMEnum } from "../utils/types"
import { CategorySelect } from "./CategorySelect"
import { CurrencySymbol } from "./CurrencySymbol"
import { QuestionCircle } from "./QuestionCircle"
import { useParams } from "react-router-dom"

type Props = {
    item: FullItemType
    setItem: (item: FullItemType) => void
}

export const ItemForm = ({ item, setItem }: Props) => {

    const { mode } = useParams<{ mode: "new" | "edit" }>()

    useEffect(() => {
        if (item.taxable) {
            setItem({ ...item, prices: { ...item.prices, cost_price: (item.prices.purchase_price || 0) / 1.18 } })
        } else {
            setItem({ ...item, prices: { ...item.prices, cost_price: (item.prices.purchase_price || 0) } })
        }
    }, [item.prices.purchase_price, item.taxable])

    return <form className="flex flex-col gap-5 h-fit">
        <div className="grid grid-cols-12 gap-6">
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-12">
                <label className="font-semibold" htmlFor="name">Nombre</label>
                <input className="border rounded-md py-1.5 px-3 outline-none" autoComplete="off" id="name" name="name" value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} />
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-6">
                <label className="font-semibold" htmlFor="subtype">Tipo</label>
                <select className="border rounded-md py-1.5 px-3 outline-none cursor-pointer" id="subtype" name="subtype" value={item.subtype} onChange={(e) => setItem({ ...item, subtype: e.target.value as ItemSubtypeEnum })}>
                    {getSubtypesByType(item.type).map(subtype => <option key={subtype} value={subtype}>{getItemSubtypeName(subtype as ItemSubtypeEnum)}</option>)}
                </select>
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-6">
                <label className="font-semibold truncate max-w-36" htmlFor="subtype">Unidad de medida</label>
                <select disabled={mode === "edit"} className="border rounded-md py-1.5 px-3 outline-none cursor-pointer disabled:cursor-not-allowed" id="um" name="um" value={item.um} onChange={(e) => setItem({ ...item, um: e.target.value as UMEnum })}>
                    <option value="unit">Unidad</option>
                    <option value="kilogram">Kilogramo</option>
                    <option value="liter">Litro</option>
                    <option value="ounce">Onza</option>
                </select>
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-7">
                <label className="font-semibold" htmlFor="category_id">Categoría</label>
                <CategorySelect category={item.category_id} setCategory={(c) => setItem({ ...item, category_id: c })} />
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-5">
                <label className="font-semibold truncate line-clamp-1" htmlFor="status">Estado</label>
                <select className="border rounded-md py-1.5 px-3 outline-none cursor-pointer" id="status" name="status" value={item.status} onChange={(e) => setItem({ ...item, status: e.target.value })}>
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                </select>
            </fieldset>
        </div>
        {item.type !== "base-recipes" && <div className="grid grid-cols-12 border-t pt-6 mt-2 border-dashed gap-6">
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-6">
                <label className="font-semibold truncate line-clamp-1" htmlFor="price">Precio</label>
                <div className="flex items-center gap-2">
                    <CurrencySymbol />
                    <input className="border rounded-md py-1.5 px-3 outline-none w-full" type="number" min={0} step={1} id="price" name="price" value={item.prices.purchase_price} onChange={(e) => setItem({ ...item, prices: { ...item.prices, purchase_price: e.target.valueAsNumber } })} />
                </div>
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-6">
                <label className="font-semibold truncate line-clamp-1 flex items-center gap-2" htmlFor="cost">Costo <QuestionCircle /></label>
                <div className="flex items-center gap-2">
                    <CurrencySymbol />
                    <input className="border rounded-md py-1.5 px-3 outline-none w-full" type="number" id="cost" name="cost" value={item.prices.cost_price.toFixed(2)} disabled />
                </div>
            </fieldset>
            <fieldset className="flex items-center gap-2 text-sm col-span-7">
                <input className="cursor-pointer" id="taxable" type="checkbox" checked={item.taxable} onChange={(e) => setItem({ ...item, taxable: e.target.checked })} />
                <label className="font-semibold cursor-pointer" htmlFor="taxable">Afecto a impuestos</label>
            </fieldset>
        </div>}
        {(item.type === "supplies" && item.subtype === "ingredients") && <div className="grid grid-cols-12 border-t pt-6 mt-2 border-dashed gap-6">
            <fieldset className="grid grid-cols-1 col-span-6 gap-1 text-sm">
                <label className="font-semibold flex items-center gap-2" htmlFor="waste">Merma <QuestionCircle /></label>
                <div className="flex items-center gap-2">
                    <span>%</span>
                    <input className="border rounded-md py-1.5 px-3 outline-none w-full mr-2" type="number" min={0} max={100} maxLength={3} step={1} id="waste" name="waste" value={item.waste} onChange={(e) => setItem({ ...item, waste: e.target.valueAsNumber > 100 ? item.waste : e.target.valueAsNumber })} />
                </div>
            </fieldset>
            <fieldset className="grid grid-cols-1 col-span-6 gap-1 text-sm">
                <label className="font-semibold flex items-center gap-2" htmlFor="clean-cost">Costo sin merma <QuestionCircle /></label>
                <div className="flex items-center gap-2">
                    <CurrencySymbol />
                    <input className="border rounded-md py-1.5 px-3 outline-none w-full mr-2" type="number" disabled id="clean-cost" name="clean-cost" value={(item.prices.cost_price / (1 - ((item.waste || 0) / 100))).toFixed(2)} />
                </div>
            </fieldset>
        </div>}
        <div className="grid grid-cols-12 border-t pt-6 mt-2 border-dashed gap-6 col-span-12">
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-6">
                <label className="font-semibold flex items-center gap-2" htmlFor="code">Código<QuestionCircle /></label>
                <input className="border rounded-md py-1.5 px-3 outline-none" id="code" maxLength={20} name="code" value={item.code} placeholder="Opcional" onChange={(e) => setItem({ ...item, code: e.target.value })} />
            </fieldset>
            <fieldset className="grid grid-cols-1 gap-1 text-sm col-span-6">
                <label className="font-semibold flex items-center gap-2" htmlFor="code">Código contable<QuestionCircle /></label>
                <input className="border rounded-md py-1.5 px-3 outline-none" id="code" maxLength={20} name="code" value={item.code} placeholder="Opcional" onChange={(e) => setItem({ ...item, code: e.target.value })} />
            </fieldset>
        </div>
    </form>
}