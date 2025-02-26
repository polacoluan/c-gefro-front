import { getColors } from "@/features/color/api/get-colors";
import { Color } from "@/features/color/types/color";
import { getCompanies } from "@/features/company/api/get-companies";
import { Company } from "@/features/company/types/company";
import { getFleets } from "@/features/fleet/api/get-fleets";
import { Fleet } from "@/features/fleet/types/fleet";
import { getFuels } from "@/features/fuel/api/get-fuels";
import { Fuel } from "@/features/fuel/types/fuel";
import { getMarks } from "@/features/mark/api/get-marks";
import { Mark } from "@/features/mark/types/mark";
import { getModels } from "@/features/model/api/get-models";
import { Model } from "@/features/model/types/model";
import { getOrigins } from "@/features/origin/api/get-origins";
import { Origin } from "@/features/origin/types/origin";
import { getStatus } from "@/features/status/api/get-status";
import { Status } from "@/features/status/types/status";
import { getSubUnities } from "@/features/sub-unity/api/get-sub-unities";
import { SubUnity } from "@/features/sub-unity/types/sub-unity";
import { getTypes } from "@/features/type/api/get-types";
import { Type } from "@/features/type/types/type";
import React, { createContext, useContext, useEffect, useState } from "react";

interface DataContextValue {
  colors: Color[];
  companies: Company[];
  fleets: Fleet[];
  fuels: Fuel[];
  marks: Mark[];
  models: Model[];
  origins: Origin[];
  status: Status[];
  subUnities: SubUnity[];
  types: Type[];
}

const VehicleContext = createContext<DataContextValue | null>(null);

export const VehicleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [colors, setColors] = useState<Color[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [fuels, setFuels] = useState<Fuel[]>([]);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [status, setStatus] = useState<Status[]>([]);
  const [subUnities, setSubUnities] = useState<SubUnity[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          colorsData,
          companiesData,
          fleetsData,
          fuelsData,
          marksData,
          modelsData,
          originsData,
          statusData,
          subUnitiesData,
          typesData,
        ] = await Promise.all([
          getColors(),
          getCompanies(),
          getFleets(),
          getFuels(),
          getMarks(),
          getModels(),
          getOrigins(),
          getStatus(),
          getSubUnities(),
          getTypes(),
        ]);

        setColors(colorsData);
        setCompanies(companiesData);
        setFleets(fleetsData);
        setFuels(fuelsData);
        setMarks(marksData);
        setModels(modelsData);
        setOrigins(originsData);
        setStatus(statusData);
        setSubUnities(subUnitiesData);
        setTypes(typesData);
      } catch {
        console.error("Erro ao buscar dados.");
      }
    };

    fetchData();
  }, []);

  return (
    <VehicleContext.Provider
      value={{
        colors,
        companies,
        fleets,
        fuels,
        marks,
        models,
        origins,
        status,
        subUnities,
        types,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
};
