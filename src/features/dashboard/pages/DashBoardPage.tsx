import { VehiclesByOriginChart } from "../components/VehiclesByOriginChart";
import { VehiclesByCompanyChart } from "../components/VehiclesByCompanyChart";
import { VehiclesList } from "../components/VehiclesList";
import { VehiclesByMarkChart } from "../components/VehiclesByMark";
import { VehiclesByStatusChart } from "../components/VehiclesByStatus";
import { VehiclesBySubUnityChart } from "../components/VehiclesBySubUnity";
import { VehiclesByTypeChart } from "../components/VehiclesByType";

export default function DashBoardPage() {
  return (
    <div className="content">
      <div className="m-2">
        <VehiclesList />
      </div>
      <div className="grid grid-cols-2 gap-4 m-2">
        <div className="col-span-2">
          <VehiclesBySubUnityChart />
        </div>
        <div className="col-span-2">
          <VehiclesByOriginChart />
        </div>
        <div>
          <VehiclesByTypeChart />
        </div>
        <div>
          <VehiclesByCompanyChart />
        </div>
        <div>
          <VehiclesByMarkChart />
        </div>
        <div>
          <VehiclesByStatusChart />
        </div>
      </div>
    </div>
  );
}
