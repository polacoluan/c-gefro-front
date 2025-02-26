"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Color } from "../types/color";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./ColorEditForm";
import DeleteDialog from "./ColorDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadColors?: () => void;
}

export const columns: ColumnDef<Color, unknown>[] = [
    {
        accessorKey: "color",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cor
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
        cell: ({ row, reloadColors }: CustomCellContext<Color>) => {
            const color = row.original as Color;

            return (
                <div>
                    <EditForm color={color} colorId={color.id} reloadColors={reloadColors} />
                    <DeleteDialog color={color} colorId={color.id} reloadColors={reloadColors} />
                </div>
            )
        }
    },
];