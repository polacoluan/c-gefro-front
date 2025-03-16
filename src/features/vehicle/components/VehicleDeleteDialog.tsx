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
import { Vehicle } from "../types/vehicle";
import { useToast } from "@/hooks/use-toast";
import { deleteVehicle } from "../api/delete-vehicle";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeleteDialog({
  vehicle,
  vehicleId,
  reloadVehicles,
}: {
  vehicle: Vehicle;
  vehicleId: string;
  reloadVehicles?: () => void;
}) {
  const { toast } = useToast();

  function removeVehicle() {
    deleteVehicle(vehicleId);

    reloadVehicles?.();

    toast({
      variant: "default",
      title: "Sucesso!",
      description: "Origem removido com sucesso!",
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
            esse origem.
            <br />
            <br />
            Placa: {vehicle.plate}
            <br />
            Prefixo: {vehicle.prefix}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={removeVehicle}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
