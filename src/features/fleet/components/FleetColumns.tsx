"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Fleet } from "../types/fleet";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./FleetEditForm";
import DeleteDialog from "./FleetDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadFleets?: () => void;
}

export const columns: ColumnDef<Fleet, unknown>[] = [
    {
        accessorKey: "fleet",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Frota
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
        cell: ({ row, reloadFleets }: CustomCellContext<Fleet>) => {
            const fleet = row.original as Fleet;

            return (
                <div>
                    <EditForm fleet={fleet} fleetId={fleet.id} reloadFleets={reloadFleets} />
                    <DeleteDialog fleet={fleet} fleetId={fleet.id} reloadFleets={reloadFleets} />
                </div>
            )
        }
    },
];