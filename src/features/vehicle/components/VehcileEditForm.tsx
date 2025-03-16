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
import { Vehicle } from "../types/vehicle";
import { editVehicle } from "../api/edit-vehicle";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@/components/ui/switch";
import { useVehicle } from "@/context/VehicleContext";
import Loader from "@/components/loading";
import { redirect } from "next/navigation";

const formSchema = z.object({
  plate: z.string(),
  prefix: z.string(),
  tracker: z.boolean(),
  chassis: z.string(),
  engine_number: z.string(),
  renavam: z.string(),
  year: z.string(),
  capacity: z.coerce.number(),
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
  isLoadingVehicle,
}: {
  vehicle: Vehicle;
  vehicleId: string;
  isLoadingVehicle: boolean;
}) {
  const {
    colors,
    fleets,
    fuels,
    marks,
    models,
    origins,
    status,
    subUnities,
    types,
    isLoadingData,
  } = useVehicle();

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plate: "",
      prefix: "",
      tracker: false,
      chassis: "",
      engine_number: "",
      renavam: "",
      year: "",
      capacity: 0,
      color_id: "",
      company_id: "",
      fleet_id: "",
      fuel_id: "",
      mark_id: "",
      model_id: "",
      origin_id: "",
      status_id: "",
      sub_unity_id: "",
      type_id: "",
    },
  });

  useEffect(() => {
    if (vehicle) {
      form.reset({
        plate: vehicle.plate,
        prefix: vehicle.prefix,
        tracker: vehicle.tracker,
        chassis: vehicle.chassis,
        engine_number: vehicle.engine_number,
        renavam: vehicle.renavam,
        year: vehicle.year,
        capacity: vehicle.capacity,
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
      });
    }
  }, [vehicle, form.reset]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const vehicleData = values as Vehicle;
    vehicleData.id = vehicleId;
    const response = await editVehicle(vehicleData);

    if (response.success) {
      toast({
        variant: "default",
        title: "Sucesso!",
        description: response.message,
      });

      redirect("/vehicles");
    } else {
      toast({
        variant: "destructive",
        title: "Falha!",
        description: response.message,
      });
    }
  }

  if (isLoadingVehicle || isLoadingData || !vehicle) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-medium">Veículo</h1>
        <h4 className="text-sm text-muted-foreground">
          Esse é o seu veículo e suas propriedades, mude os valores dos campos
          para edita-lo.
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
          <FormField
            control={form.control}
            name="chassis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chassi</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormDescription>
                  Este é o número de chassi do seu veículo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="engine_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nº do Motor</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormDescription>
                  Esta é a numeração do motor do seu veículo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="renavam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Renavam</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormDescription>
                  Este é o número do renavam do seu veículo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormDescription>Este é o ano do seu veículo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacidade</FormLabel>
                <FormControl>
                  <Input {...field} required />
                </FormControl>
                <FormDescription>
                  Esta é a capacidade do seu veículo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="color_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cor do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        {color.color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Esta é a cor do seu veículo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orgão</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o orgão de origem do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {origins.map((origin) => (
                      <SelectItem key={origin.id} value={origin.id}>
                        {origin.origin}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Esta é o orgão de origem do seu veículo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fleet_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frota</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a frota do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fleets.map((fleet) => (
                      <SelectItem key={fleet.id} value={fleet.id}>
                        {fleet.fleet}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Esta é a frota do seu veículo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuel_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Combustível</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o combustível do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {fuels.map((fuel) => (
                      <SelectItem key={fuel.id} value={fuel.id}>
                        {fuel.fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Este é o combustível do seu veículo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mark_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a marca do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {marks.map((mark) => (
                      <SelectItem key={mark.id} value={mark.id}>
                        {mark.mark}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Esta é a marca do seu veículo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o modelo do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Este é o modelo do seu veículo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="origin_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origem</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a origem do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {origins.map((origin) => (
                      <SelectItem key={origin.id} value={origin.id}>
                        {origin.origin}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Esta é a origem do seu veículo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {status.map((status) => (
                      <SelectItem key={status.id} value={status.id}>
                        {status.status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Este é o status do seu veículo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sub_unity_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Unidade</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a sub unidade do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subUnities.map((subUnity) => (
                      <SelectItem key={subUnity.id} value={subUnity.id}>
                        {subUnity.sub_unity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Esta é a sub unidade do seu veículo
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo do seu veículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Este é o tipo do seu veículo</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tracker"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Rastreador
                  <br />
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Isso define se o veículo possui rastreador.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="rounded-lg p-2 font-bold">
            Salvar
          </Button>
        </form>
      </Form>
    </div>
  );
}
