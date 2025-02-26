"use client";

import React, { useEffect, useState } from "react";
import { getCompanies } from "@/features/company/api/get-companies";
import { columns } from "../components/CompanyColumns";
import { DataTable } from "../components/CompanyDataTable";
import CreateForm from "../components/CompanyCreateForm";
import Loader from "@/components/loading";

const companyPage = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadCompany = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error("Error reloading Company:", error);
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Orgãos</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onCompanyCreated={reloadCompany} />
          </div>
          <DataTable columns={columns} data={companies} reloadCompanies={reloadCompany} />
        </div>
      )}
    </div>
  );
};

export default companyPage;