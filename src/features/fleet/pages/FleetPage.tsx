"use client";

import React, { useEffect, useState } from "react";
import { getFleets } from "@/features/fleet/api/get-fleets";
import { columns } from "../components/FleetColumns";
import { DataTable } from "../components/FleetDataTable";
import CreateForm from "../components/FleetCreateForm";
import Loader from "@/components/loading";

const fleetPage = () => {
  const [fleet, setFleet] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getFleets();
        setFleet(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadFleet = async () => {
    try {
      const data = await getFleets();
      setFleet(data);
    } catch (error) {
      console.error("Error reloading Fleet:", error);
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Frotas</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onFleetCreated={reloadFleet} />
          </div>
          <DataTable columns={columns} data={fleet} reloadFleets={reloadFleet} />
        </div>
      )}
    </div>
  );
};

export default fleetPage;