"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Vehicle } from "../types/vehicle";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./VehcileEditForm";
import DeleteDialog from "./VehicleDeleteDialog";
import Link from "next/link";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  reloadVehicles?: () => void;
}

export const columns: ColumnDef<Vehicle, unknown>[] = [
  {
    accessorKey: "vehicle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Veículo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "plate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Placa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "prefix",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prefixo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "tracker_pt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rastreador
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "renavam",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Renavam
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
    cell: ({ row, reloadVehicles }: CustomCellContext<Vehicle>) => {
      const vehicle = row.original as Vehicle;

      return (
        <div className="space-x-2">
          <Link
            href={`/vehicle/edit/${vehicle.id}`}
            className="border rounded-md p-3 hover:bg-muted"
          >
            Editar
          </Link>
          <DeleteDialog
            vehicle={vehicle}
            vehicleId={vehicle.id}
            reloadVehicles={reloadVehicles}
          />
        </div>
      );
    },
  },
];
