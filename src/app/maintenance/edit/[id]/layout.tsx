import { MaintenanceProvider } from "@/context/MaintenanceContext";

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MaintenanceProvider>{children}</MaintenanceProvider>;
}
