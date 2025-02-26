"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Model } from "../types/model";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./ModelEditForm";
import DeleteDialog from "./ModelDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadModels?: () => void;
}

export const columns: ColumnDef<Model, unknown>[] = [
    {
        accessorKey: "model",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Modelo
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
        cell: ({ row, reloadModels }: CustomCellContext<Model>) => {
            const model = row.original as Model;

            return (
                <div>
                    <EditForm model={model} modelId={model.id} reloadModels={reloadModels} />
                    <DeleteDialog model={model} modelId={model.id} reloadModels={reloadModels} />
                </div>
            )
        }
    },
];