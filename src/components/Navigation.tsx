import { ArrowLeftRight, BookMarked, BookUser, ClipboardList, Computer, Layers2, LayoutDashboard, LayoutList, ListOrdered, MessageSquareText, NotebookText, Settings, ShoppingBag, Tickets, Truck, Users, Wallet } from "lucide-react";
import { NavGroup } from "./NavGroup";
import { NavLink } from "./NavLink";

export const Navigation = () => {

  return (
    <nav className="flex flex-col gap-4">
      <NavGroup title="MENU" >
        <NavLink icon={LayoutDashboard} url="/dashboard" >Resumen</NavLink>
        <NavLink icon={Computer} url="/register" >Caja</NavLink>
        <NavLink icon={Tickets} url="/orders" >Pedidos</NavLink>
        <NavLink icon={Wallet} url="/sales" >Ventas</NavLink>
        <NavLink icon={BookUser} url="/customers" >Clientes</NavLink>
        <NavLink icon={Layers2} base="/items" url="/items/products?status=active" >Ítems</NavLink>
      </NavGroup>
      <NavGroup title="HERRAMIENTAS" >
        <NavLink icon={ArrowLeftRight} url="/converter" >Conversor</NavLink>
        <NavLink icon={BookMarked} url="/book" >Libro recetario</NavLink>
        <NavLink icon={MessageSquareText} url="/surveys" >Encuentas</NavLink>
      </NavGroup>
      <NavGroup title="LOGÍSTICA" >
        <NavLink icon={ShoppingBag} url="/purchases" >Compras</NavLink>
        <NavLink icon={Truck} url="/suppliers" >Proveedores</NavLink>
        <NavLink icon={ClipboardList} url="/inventories" >Inventarios</NavLink>
        <NavLink icon={NotebookText} url="/requirements" >Requerimientos</NavLink>
        <NavLink icon={LayoutList} url="/productions" >Producciones</NavLink>
        <NavLink icon={ListOrdered} url="/counts" >Conteos</NavLink>
      </NavGroup>
      <NavGroup title="OPCIONES" >
        <NavLink icon={Users} url="/users" >Usuarios</NavLink>
        <NavLink icon={Settings} url="/settings" >Ajustes</NavLink>
      </NavGroup>
    </nav>
  );
};
