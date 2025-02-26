"use client";

import React, { useEffect, useState } from "react";
import { getSubUnities } from "@/features/sub-unity/api/get-sub-unities";
import { columns } from "../components/SubUnityColumns";
import { DataTable } from "../components/SubUnityDataTable";
import CreateForm from "../components/SubUnityCreateForm";
import Loader from "@/components/loading";

const markPage = () => {
  const [SubUnity, setSubUnity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getSubUnities();
        setSubUnity(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadSubUnities = async () => {
    try {
      const data = await getSubUnities();
      setSubUnity(data);
    } catch (error) {
      console.error("Error reloading SubUnity:", error);
    }
  };
  
  console.log(SubUnity);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Sub Unidades</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onSubUnityCreated={reloadSubUnities} />
          </div>
          <DataTable columns={columns} data={SubUnity} reloadSubUnities={reloadSubUnities} />
        </div>
      )}
    </div>
  );
};

export default markPage;