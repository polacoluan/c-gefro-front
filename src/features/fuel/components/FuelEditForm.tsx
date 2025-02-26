"use client";

import React, { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { Fuel } from "../types/fuel";
import { editFuel } from "../api/edit-fuel";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
    fuel: z.string().min(2, {
        message: "Combustível precisa ter ao menos 2 caracteres.",
    }),
    description: z.string().min(2, {
        message: "Descrição precisa ter ao menos 2 caracteres.",
    }),
});

export default function EditForm({ fuel, fuelId, reloadFuels }: { fuel: Fuel; fuelId: string; reloadFuels?: () => void; }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fuel: fuel.fuel,
            description: fuel.description,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const fuelData = values as Fuel;
        fuelData.id = fuelId;
        editFuel(fuelData);

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Combustível editado com sucesso!",
        });

        reloadFuels?.();

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-blue-600 rounded-full p-2 mr-2"><p className="flex text-white font-medium"><Pencil color="#ffffff" height={15} /> Editar</p></SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Editar Combustível</SheetTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="fuel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Combustível</FormLabel>
                                        <FormControl>
                                            <Input {...field} required />
                                        </FormControl>
                                        <FormDescription>
                                            Este é o nome do seu combustível.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Input {...field} required />
                                        </FormControl>
                                        <FormDescription>
                                            Este é a descrição do seu combustível.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />                        
                            <Button type="submit" className="bg-blue-600 rounded-full p-2 mr-2"><p className="flex text-white font-medium"><Pencil color="#ffffff" height={15} /> Editar</p></Button>
                        </form>
                    </Form>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}