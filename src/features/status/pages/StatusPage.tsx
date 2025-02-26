"use client";

import React, { useEffect, useState } from "react";
import { getStatus } from "@/features/status/api/get-status";
import { columns } from "../components/StatusColumns";
import { DataTable } from "../components/StatusDataTable";
import CreateForm from "../components/StatusCreateForm";
import Loader from "@/components/loading";

const statusPage = () => {
  const [Status, setStatus] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getStatus();
        setStatus(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadStatus = async () => {
    try {
      const data = await getStatus();
      setStatus(data);
    } catch (error) {
      console.error("Error reloading Status:", error);
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Status</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onStatusCreated={reloadStatus} />
          </div>
          <DataTable columns={columns} data={Status} reloadStatuss={reloadStatus} />
        </div>
      )}
    </div>
  );
};

export default statusPage;