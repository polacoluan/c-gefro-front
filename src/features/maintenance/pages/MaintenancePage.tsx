"use client";

import React, { useEffect, useState } from "react";
import { getMaintenances } from "@/features/maintenance/api/get-maintenances";
import { columns } from "../components/MaintenanceColumns";
import { DataTable } from "../components/MaintenanceDataTable";
import CreateForm from "../components/MaintenanceCreateForm";
import Loader from "@/components/loading";

const MaintenancePage = () => {
  const [types, setMaintenances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getMaintenances();
        setMaintenances(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadMaintenances = async () => {
    try {
      const data = await getMaintenances();
      setMaintenances(data);
    } catch (error) {
      console.error("Error reloading types:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Manutenções</h1>
      <DataTable
        columns={columns}
        data={types}
        reloadMaintenances={reloadMaintenances}
      />
    </div>
  );
};

export default MaintenancePage;
