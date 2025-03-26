import MaintenanceEditPage from "@/features/maintenance/pages/MaintenanceEditPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <MaintenanceEditPage id={id} />;
}
