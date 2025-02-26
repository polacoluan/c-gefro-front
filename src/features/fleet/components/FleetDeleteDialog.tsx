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
import { Fleet } from "../types/fleet";
import { useToast } from "@/hooks/use-toast";
import { deleteFleet } from "../api/delete-fleet";
import { Trash } from "lucide-react";

export default function DeleteDialog({ fleet, fleetId, reloadFleets }: { fleet: Fleet; fleetId: string; reloadFleets?: () => void; }) {
    const { toast } = useToast();

    function removeFleet() {
        deleteFleet(fleetId);

        reloadFleets?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Frota removido com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente esse frota.<br /><br />
                        Frota: {fleet.fleet}<br />
                        Descrição: {fleet.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeFleet}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}