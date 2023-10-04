import { Column, ColumnDef } from "@tanstack/react-table";
import { System, SystemStatus } from "@/types/system";
import { Button } from "@/components/ui/button";
import { ArrowDownIcon, ArrowUpIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

function sortableColumn(label: string, column: Column<System>) {
  const sorted = column.getIsSorted();

  return (
    <Button
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      type="button"
      variant="ghost"
    >
      {label}
      {sorted ? (
        sorted === "asc" ? (
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        ) : (
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        )
      ) : null}
    </Button>
  );
}

export const dataColumnsSystem: ColumnDef<System>[] = [
  {
    accessorKey: "acronym",
    header: ({ column }) => sortableColumn("Sigla", column),
  },
  {
    accessorKey: "description",
    header: ({ column }) => sortableColumn("Descrição", column),
  },
  {
    accessorKey: "email",
    header: ({ column }) => sortableColumn("E-mail de atendimento", column),
  },
  {
    accessorKey: "url",
    header: ({ column }) => sortableColumn("URL", column),
  },
  {
    accessorKey: "status",
    header: ({ column }) => sortableColumn("Status", column),
    cell: ({ row }) => {
      const value = row.getValue("status") as SystemStatus;
      const translatedValue = {
        ACTIVE: "Ativo",
        CANCELED: "Cancelado",
      };
      return translatedValue[value];
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const systemId = row.original.id;

      return (
        <Link href={`/system/${systemId}`}>
          <PencilIcon className="h-5 w-5 text-warning" />
        </Link>
      );
    },
  },
];
