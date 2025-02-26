"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Fuel } from "../types/fuel";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./FuelEditForm";
import DeleteDialog from "./FuelDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadFuels?: () => void;
}

export const columns: ColumnDef<Fuel, unknown>[] = [
    {
        accessorKey: "fuel",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Combustível
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
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
            )
        },
    },
    {
        id: "actions",
        header: () => {
            return (
                <div>
                    Ações
                </div>
            )
        },
        cell: ({ row, reloadFuels }: CustomCellContext<Fuel>) => {
            const fuel = row.original as Fuel;

            return (
                <div>
                    <EditForm fuel={fuel} fuelId={fuel.id} reloadFuels={reloadFuels} />
                    <DeleteDialog fuel={fuel} fuelId={fuel.id} reloadFuels={reloadFuels} />
                </div>
            )
        }
    },
];