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
import { createType } from "../api/create-type";
import { Type } from "../types/type";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
    type: z.string().min(2, {
        message: "Tipo precisa ter ao menos 2 caracteres.",
    }),
    description: z.string().min(2, {
        message: "Descrição precisa ter ao menos 2 caracteres.",
    }),
});

export default function CreateForm({ onTypeCreated }: { onTypeCreated: () => void }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "",
            description: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const typeData = values as Type;
        createType(typeData);

        form.reset();

        toast("Tipo criado com sucesso.")

        onTypeCreated();

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-green-600 rounded-full p-2 mr-2"><p className="flex text-white font-medium"><CirclePlus color="#ffffff" height={20} /> Cadastrar</p></SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Cadasto de Tipo</SheetTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
                                        <FormControl>
                                            <Input {...field} required />
                                        </FormControl>
                                        <FormDescription>
                                            Este é o nome do seu tipo.
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
                                            Este é a descrição do seu tipo.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-green-600 rounded-full p-2 mr-2"><p className="flex text-white font-medium"><CirclePlus color="#ffffff" height={20} /> Cadastrar</p></Button>
                        </form>
                    </Form>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}