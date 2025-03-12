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
import { Maintenance } from "../types/maintenance";
import { editMaintenance } from "../api/edit-maintenance";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  maintenance: z.string().min(2, {
    message: "Manutenção precisa ter ao menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "Descrição precisa ter ao menos 2 caracteres.",
  }),
  cost: z.string().min(2, {
    message: "Custo precisa ter ao menos 2 caracteres.",
  }),
  kilometers: z.string().min(2, {
    message: "Kilometros precisa ter ao menos 2 caracteres.",
  }),
  date: z.string().min(2, {
    message: "Data precisa ter ao menos 2 caracteres.",
  }),
  next_maintenance: z.string().min(2, {
    message: "Próxima Manutenção precisa ter ao menos 2 caracteres.",
  }),
});

export default function EditForm({
  maintenance,
  maintenanceId,
  reloadMaintenances,
}: {
  maintenance: Maintenance;
  maintenanceId: string;
  reloadMaintenances?: () => void;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maintenance: maintenance.maintenance,
      description: maintenance.description,
      cost: maintenance.cost,
      kilometers: maintenance.kilometers,
      date: maintenance.date,
      next_maintenance: maintenance.next_maintenance,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const maintenanceData = values as Maintenance;
    maintenanceData.id = maintenanceId;
    editMaintenance(maintenanceData);

    toast({
      variant: "default",
      title: "Sucesso!",
      description: "Manutenção editada com sucesso!",
    });

    reloadMaintenances?.();

    setIsSheetOpen(false);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="bg-blue-600 rounded-full p-2 mr-2">
        <p className="flex text-white font-medium">
          <Pencil color="#ffffff" height={15} /> Editar
        </p>
      </SheetTrigger>
      <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Editar Manutenção</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="maintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manutenção</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormDescription>
                      Este é o nome da sua manutenção.
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
                      Esta é a descrição da sua manutenção.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custo</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormDescription>
                      Este é o custo da sua manutenção.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kilometers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KM</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormDescription>
                      Esta é a kilometragem do veículo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} required />
                    </FormControl>
                    <FormDescription>
                      Esta é a data de manutenção do veículo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="next_maintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data - Próx. Manutenção</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} required />
                    </FormControl>
                    <FormDescription>
                      Esta é a data da próxima manutenção do veículo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-blue-600 rounded-full p-2 mr-2"
              >
                <p className="flex text-white font-medium">
                  <Pencil color="#ffffff" height={15} /> Editar
                </p>
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
