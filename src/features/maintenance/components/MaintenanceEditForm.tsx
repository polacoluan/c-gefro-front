"use client";

import React, { useEffect } from "react";

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
import { Maintenance } from "../types/maintenance";
import { editMaintenance } from "../api/edit-maintenance";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/loading";
import { useMaintenance } from "@/context/MaintenanceContext";
import { redirect } from "next/navigation";

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

export default function MaintenanceEditForm({
  maintenance,
  maintenanceId,
  isLoadingMaintenance,
}: {
  maintenance: Maintenance;
  maintenanceId: string;
  reloadMaintenances?: () => void;
  isLoadingMaintenance: boolean;
}) {
  const { vehicles } = useMaintenance();
  const { toast } = useToast();
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

  useEffect(() => {
    if (maintenance) {
      form.reset({
        maintenance: maintenance.maintenance,
        description: maintenance.description,
        vehicle_id: maintenance.vehicle_id,
        cost: maintenance.cost,
        kilometers: maintenance.kilometers,
        date: maintenance.date,
        next_maintenance: maintenance.next_maintenance,
      });
    }
  }, [maintenance, form.reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const maintenanceData = values as Maintenance;
    maintenanceData.id = maintenanceId;
    const response = await editMaintenance(maintenanceData);

    if (response.success) {
      toast({
        variant: "default",
        title: "Sucesso!",
        description: response.message,
      });

      redirect("/maintenance");
    } else {
      toast({
        variant: "destructive",
        title: "Falha!",
        description: response.message,
      });
    }
  }

  if (isLoadingMaintenance || !maintenance || !vehicles) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Manutenção</h1>
        <h4 className="text-sm text-muted-foreground">
          Esta é a sua manutenção e suas propriedades, mude os valores dos
          campos para edita-la.
        </h4>
      </div>
      <div
        className="shrink-0 bg-border h-[1px] w-full"
        data-horientation="horizontal"
        role="none"
      ></div>
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
          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
}
