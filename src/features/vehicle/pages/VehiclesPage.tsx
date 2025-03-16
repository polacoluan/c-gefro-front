"use client";

import React, { useEffect, useState } from "react";
import { getVehicles } from "@/features/vehicle/api/get-vehicles";
import { columns } from "../components/VehicleColumns";
import { DataTable } from "../components/VehicleDataTable";
import Loader from "@/components/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const vehiclesPage = () => {
  const [Vehicle, setVehicle] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getVehicles();
        setVehicle(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadVehicle = async () => {
    try {
      const data = await getVehicles();
      setVehicle(data);
    } catch (error) {
      console.error("Error reloading Vehicle:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Veículos</h1>
      <DataTable
        columns={columns}
        data={Vehicle}
        reloadVehicles={reloadVehicle}
      />
    </div>
  );
};

export default vehiclesPage;
