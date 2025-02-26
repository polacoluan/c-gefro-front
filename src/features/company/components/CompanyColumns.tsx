"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Company } from "../types/company";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./CompanyEditForm";
import DeleteDialog from "./CompanyDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadCompanies?: () => void;
}

export const columns: ColumnDef<Company, unknown>[] = [
    {
        accessorKey: "company",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Orgão
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
        cell: ({ row, reloadCompanies }: CustomCellContext<Company>) => {
            const company = row.original as Company;

            return (
                <div>
                    <EditForm company={company} companyId={company.id} reloadCompanies={reloadCompanies} />
                    <DeleteDialog company={company} companyId={company.id} reloadCompanies={reloadCompanies} />
                </div>
            )
        }
    },
];