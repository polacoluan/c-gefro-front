"use client";

import React, { useEffect, useState } from "react";
import { getModels } from "@/features/model/api/get-models";
import { columns } from "../components/ModelColumns";
import { DataTable } from "../components/ModelDataTable";
import CreateForm from "../components/ModelCreateForm";
import Loader from "@/components/loading";

const ModelPage = () => {
  const [models, setModels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getModels();
        setModels(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadModels = async () => {
    try {
      const data = await getModels();
      setModels(data);
    } catch (error) {
      console.error("Error reloading models:", error);
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Modelos</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onModelCreated={reloadModels} />
          </div>
          <DataTable columns={columns} data={models} reloadModels={reloadModels} />
        </div>
      )}
    </div>
  );
};

export default ModelPage;