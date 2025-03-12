import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Maintenance } from "../types/maintenance";
import { useToast } from "@/hooks/use-toast";
import { deleteMaintenance } from "../api/delete-maintenance";
import { Trash } from "lucide-react";

export default function DeleteDialog({
  maintenance,
  maintenanceId,
  reloadMaintenances,
}: {
  maintenance: Maintenance;
  maintenanceId: string;
  reloadMaintenances?: () => void;
}) {
  const { toast } = useToast();

  function removeMaintenance() {
    deleteMaintenance(maintenanceId);

    reloadMaintenances?.();

    toast({
      variant: "default",
      title: "Sucesso!",
      description: "Manutenção removida com sucesso!",
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 rounded-full p-2">
        <p className="flex text-white font-medium">
          <Trash color="#ffffff" height={15} /> Excluir
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá deletar permanentemente
            essa manutenção.
            <br />
            <br />
            Tipo: {maintenance.maintenance}
            <br />
            Descrição: {maintenance.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={removeMaintenance}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
