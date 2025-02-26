"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Mark } from "../types/mark";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./MarkEditForm";
import DeleteDialog from "./MarkDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadMarks?: () => void;
}

export const columns: ColumnDef<Mark, unknown>[] = [
    {
        accessorKey: "mark",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Marca
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
        cell: ({ row, reloadMarks }: CustomCellContext<Mark>) => {
            const mark = row.original as Mark;

            return (
                <div>
                    <EditForm mark={mark} markId={mark.id} reloadMarks={reloadMarks} />
                    <DeleteDialog mark={mark} markId={mark.id} reloadMarks={reloadMarks} />
                </div>
            )
        }
    },
];