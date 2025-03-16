"use client";

import React, { useEffect, useState } from "react";
import { findVehicle } from "@/features/vehicle/api/find-vehicle";
import { Vehicle } from "../types/vehicle";
import VehicleEditForm from "../components/VehcileEditForm";

const VehicleEditPage = ({ id }: { id: any }) => {
  const [vehicle, setVehicle] = useState<Vehicle>({} as Vehicle);
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(true);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setIsLoadingVehicle(true);
        const data = await findVehicle(id);
        setVehicle(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoadingVehicle(false);
      }
    };

    fetchVehicle();
  }, [id]);

  return (
    <div className="p-6">
      <VehicleEditForm
        vehicle={vehicle}
        vehicleId={vehicle.id}
        isLoadingVehicle={isLoadingVehicle}
      />
    </div>
  );
};

export default VehicleEditPage;
