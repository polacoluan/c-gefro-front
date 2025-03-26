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
import { Button } from "@/components/ui/button";

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
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Excluir</Button>
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
