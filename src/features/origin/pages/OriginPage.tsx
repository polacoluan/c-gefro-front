"use client";

import React, { useEffect, useState } from "react";
import { getOrigins } from "@/features/origin/api/get-origins";
import { columns } from "../components/OriginColumns";
import { DataTable } from "../components/OriginDataTable";
import CreateForm from "../components/OriginCreateForm";
import Loader from "@/components/loading";

const originPage = () => {
  const [origins, setOrigins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getOrigins();
        setOrigins(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadOrigin = async () => {
    try {
      const data = await getOrigins();
      setOrigins(data);
    } catch (error) {
      console.error("Error reloading Origin:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Origens</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onOriginCreated={reloadOrigin} />
          </div>
          <DataTable
            columns={columns}
            data={origins}
            reloadOrigins={reloadOrigin}
          />
        </div>
      )}
    </div>
  );
};

export default originPage;
