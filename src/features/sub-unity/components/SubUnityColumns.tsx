"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { SubUnity } from "../types/sub-unity";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./SubUnityEditForm";
import DeleteDialog from "./SubUnityDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadSubUnities?: () => void;
}

export const columns: ColumnDef<SubUnity, unknown>[] = [
    {
        accessorKey: "sub_unity",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Sub Unidade
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
        cell: ({ row, reloadSubUnities }: CustomCellContext<SubUnity>) => {
            const subUnity = row.original as SubUnity;

            return (
                <div>
                    <EditForm subUnity={subUnity} subUnityId={subUnity.id} reloadSubUnities={reloadSubUnities} />
                    <DeleteDialog subUnity={subUnity} subUnityId={subUnity.id} reloadSubUnities={reloadSubUnities} />
                </div>
            )
        }
    },
];