"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVehicles } from "@/features/vehicle/api/get-vehicles";
import { columns } from "@/features/vehicle/components/VehicleColumns";
import { DataTable } from "@/features/vehicle/components/VehicleDataTable";
import Loader from "@/components/loading";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function VehiclesList() {
  const [listData, setListData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListData = async () => {
      try {
        setIsLoading(true);
        const data = await getVehicles();
        setListData(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Veículos por Orgão</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={listData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
