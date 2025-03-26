"use client";

import React, { useEffect, useState } from "react";
import { findMaintenance } from "@/features/maintenance/api/find-maintenance";
import { Maintenance } from "../types/maintenance";
import MaintenanceEditForm from "../components/MaintenanceEditForm";

export default function MaintenanceEditPage({ id }: { id: any }) {
  const [maintenance, setMaintenance] = useState<Maintenance>(
    {} as Maintenance
  );
  const [isLoadingMaintenance, setIsLoadingMaintenance] = useState(true);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        setIsLoadingMaintenance(true);
        const data = await findMaintenance(id);
        setMaintenance(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoadingMaintenance(false);
      }
    };

    fetchMaintenance();
  }, [id]);

  return (
    <div className="p-6">
      <MaintenanceEditForm
        maintenance={maintenance}
        maintenanceId={maintenance.id}
        isLoadingMaintenance={isLoadingMaintenance}
      />
    </div>
  );
}
