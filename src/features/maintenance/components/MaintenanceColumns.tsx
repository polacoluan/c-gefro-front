"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Maintenance } from "../types/maintenance";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./MaintenanceEditForm";
import DeleteDialog from "./MaintenanceDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  reloadMaintenances?: () => void;
}

export const columns: ColumnDef<Maintenance, unknown>[] = [
  {
    accessorKey: "maintenance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Manutenção
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cost",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Custo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "kilometers",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          KM's
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "next_maintenance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pŕoxima Manutenção
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return <div>Ações</div>;
    },
    cell: ({ row, reloadMaintenances }: CustomCellContext<Maintenance>) => {
      const maintenance = row.original as Maintenance;

      return (
        <div>
          <EditForm
            maintenance={maintenance}
            maintenanceId={maintenance.id}
            reloadMaintenances={reloadMaintenances}
          />
          <DeleteDialog
            maintenance={maintenance}
            maintenanceId={maintenance.id}
            reloadMaintenances={reloadMaintenances}
          />
        </div>
      );
    },
  },
];
