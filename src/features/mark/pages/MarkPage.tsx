"use client";

import React, { useEffect, useState } from "react";
import { getMarks } from "@/features/mark/api/get-marks";
import { columns } from "../components/MarkColumns";
import { DataTable } from "../components/MarkDataTable";
import CreateForm from "../components/MarkCreateForm";
import Loader from "@/components/loading";

const markPage = () => {
  const [Mark, setMark] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getMarks();
        setMark(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadMark = async () => {
    try {
      const data = await getMarks();
      setMark(data);
    } catch (error) {
      console.error("Error reloading Mark:", error);
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Marcas</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onMarkCreated={reloadMark} />
          </div>
          <DataTable columns={columns} data={Mark} reloadMarks={reloadMark} />
        </div>
      )}
    </div>
  );
};

export default markPage;