"use client";

import React, { useEffect, useState } from "react";
import { getColors } from "@/features/color/api/get-colors";
import { columns } from "../components/ColorColumns";
import { DataTable } from "../components/ColorDataTable";
import CreateForm from "../components/ColorCreateForm";
import Loader from "@/components/loading";

const colorPage = () => {
  const [color, setColor] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getColors();
        setColor(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadColor = async () => {
    try {
      const data = await getColors();
      setColor(data);
    } catch (error) {
      console.error("Error reloading Color:", error);
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
            <CreateForm onColorCreated={reloadColor} />
          </div>
          <DataTable columns={columns} data={color} reloadColors={reloadColor} />
        </div>
      )}
    </div>
  );
};

export default colorPage;