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
import { Vehicle } from "../types/vehicle";
import { editVehicle } from "../api/edit-vehicle";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  plate: z.string(),
  prefix: z.string(),
  tracker: z.boolean(),
  chassis: z.string(),
  engine_number: z.string(),
  renavam: z.string(),
  year: z.string(),
  color_id: z.string(),
  company_id: z.string(),
  fleet_id: z.string(),
  fuel_id: z.string(),
  mark_id: z.string(),
  model_id: z.string(),
  origin_id: z.string(),
  status_id: z.string(),
  sub_unity_id: z.string(),
  type_id: z.string(),
});

export default function EditForm({
  vehicle,
  vehicleId,
  reloadVehicles,
}: {
  vehicle: Vehicle;
  vehicleId: string;
  reloadVehicles?: () => void;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plate: vehicle.plate,
      prefix: vehicle.prefix,
      tracker: vehicle.tracker,
      chassis: vehicle.chassis,
      engine_number: vehicle.engine_number,
      renavam: vehicle.renavam,
      year: vehicle.year,
      color_id: vehicle.color_id,
      company_id: vehicle.company_id,
      fleet_id: vehicle.fleet_id,
      fuel_id: vehicle.fuel_id,
      mark_id: vehicle.mark_id,
      model_id: vehicle.model_id,
      origin_id: vehicle.origin_id,
      status_id: vehicle.status_id,
      sub_unity_id: vehicle.sub_unity_id,
      type_id: vehicle.type_id,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const vehicleData = values as Vehicle;
    vehicleData.id = vehicleId;
    editVehicle(vehicleData);

    toast({
      variant: "default",
      title: "Sucesso!",
      description: "Veículo editado com sucesso!",
    });

    reloadVehicles?.();

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
          <SheetTitle>Editar Veículo</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormDescription>
                      Este é a placa do seu veículo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prefixo</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormDescription>
                      Este é o prefixo do seu veículo.
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
