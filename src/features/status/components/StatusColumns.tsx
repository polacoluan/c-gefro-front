"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Status } from "../types/status";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./StatusEditForm";
import DeleteDialog from "./StatusDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadStatuss?: () => void;
}

export const columns: ColumnDef<Status, unknown>[] = [
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
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
        cell: ({ row, reloadStatuss }: CustomCellContext<Status>) => {
            const status = row.original as Status;

            return (
                <div>
                    <EditForm status={status} statusId={status.id} reloadStatuss={reloadStatuss} />
                    <DeleteDialog status={status} statusId={status.id} reloadStatuss={reloadStatuss} />
                </div>
            )
        }
    },
];