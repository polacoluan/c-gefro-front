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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createMaintenance } from "../api/create-maintenance";
import { Maintenance } from "../types/maintenance";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import { useMaintenance } from "@/context/MaintenanceContext";

const formSchema = z.object({
  maintenance: z.string().min(2, {
    message: "Manutenção precisa ter ao menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "Descrição precisa ter ao menos 2 caracteres.",
  }),
  vehicle_id: z.string(),
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

export default function CreateForm({
  onMaintenanceCreated,
}: {
  onMaintenanceCreated: () => void;
}) {
  const { vehicles } = useMaintenance();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicle_id: "",
      maintenance: "",
      description: "",
      cost: "",
      kilometers: "",
      date: "",
      next_maintenance: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const maintenanceData = values as Maintenance;
    createMaintenance(maintenanceData);

    form.reset();

    toast("Manutenção criado com sucesso.");

    onMaintenanceCreated();

    setIsSheetOpen(false);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="bg-green-600 rounded-full p-2 mr-2">
        <p className="flex text-white font-medium">
          <CirclePlus color="#ffffff" height={20} /> Cadastrar
        </p>
      </SheetTrigger>
      <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Cadasto de Manutenção</SheetTitle>
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
                name="vehicle_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veículo</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o seu veículo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.vehicle + " | " + vehicle.plate}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Este é o seu veículo</FormDescription>
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
                      <Input type="date" {...field} required />
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
                      <Input type="date" {...field} required />
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
                className="bg-green-600 rounded-full p-2 mr-2"
              >
                <p className="flex text-white font-medium">
                  <CirclePlus color="#ffffff" height={20} /> Cadastrar
                </p>
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
