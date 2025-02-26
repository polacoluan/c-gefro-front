"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Origin } from "../types/origin";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./OriginEditForm";
import DeleteDialog from "./OriginDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadOrigins?: () => void;
}

export const columns: ColumnDef<Origin, unknown>[] = [
    {
        accessorKey: "origin",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Origem
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
        cell: ({ row, reloadOrigins }: CustomCellContext<Origin>) => {
            const origin = row.original as Origin;

            return (
                <div>
                    <EditForm origin={origin} originId={origin.id} reloadOrigins={reloadOrigins} />
                    <DeleteDialog origin={origin} originId={origin.id} reloadOrigins={reloadOrigins} />
                </div>
            )
        }
    },
];