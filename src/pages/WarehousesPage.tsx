import { Plus } from "lucide-react";
import { LinkButton } from "../components/ui/LinkButton";
import { PageHeader } from "../components/ui/PageHeader";
import { StatusFilter } from "../components/filters/StatusFilter";
import { FilterWidget } from "../components/filters/FilterWidget";

export const WarehousesPage = () => {
  return (
    <>
      <PageHeader title="Almacenes">
        <FilterWidget>
          <StatusFilter />
        </FilterWidget>
        <LinkButton icon={Plus} url={`/restaurant/settings/warehouses/new`}>
          Nuevo almacen
        </LinkButton>
      </PageHeader>
    </>
  );
};
