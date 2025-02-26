"use client";

import React, { useEffect, useState } from "react";
import { getFuels } from "@/features/fuel/api/get-fuels";
import { columns } from "../components/FuelColumns";
import { DataTable } from "../components/FuelDataTable";
import CreateForm from "../components/FuelCreateForm";
import Loader from "@/components/loading";

const fuelPage = () => {
  const [fuel, setFuel] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getFuels();
        setFuel(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadFuel = async () => {
    try {
      const data = await getFuels();
      setFuel(data);
    } catch (error) {
      console.error("Error reloading Fuel:", error);
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Combustíveis</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onFuelCreated={reloadFuel} />
          </div>
          <DataTable columns={columns} data={fuel} reloadFuels={reloadFuel} />
        </div>
      )}
    </div>
  );
};

export default fuelPage;