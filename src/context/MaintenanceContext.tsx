"use client";

import { getVehicles } from "@/features/vehicle/api/get-vehicles";
import { Vehicle } from "@/features/vehicle/types/vehicle";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DataContextValue {
  vehicles: Vehicle[];
}

const MaintenanceContext = createContext<DataContextValue | null>(null);

export const MaintenanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vehiclesData] = await Promise.all([getVehicles()]);

        setVehicles(vehiclesData);
      } catch {
        console.error("Erro ao buscar dados.");
      }
    };

    fetchData();
  }, []);

  return (
    <MaintenanceContext.Provider
      value={{
        vehicles,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => {
  const context = useContext(MaintenanceContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
};
