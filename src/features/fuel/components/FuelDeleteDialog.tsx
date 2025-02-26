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
import { Fuel } from "../types/fuel";
import { useToast } from "@/hooks/use-toast";
import { deleteFuel } from "../api/delete-fuel";
import { Trash } from "lucide-react";

export default function DeleteDialog({ fuel, fuelId, reloadFuels }: { fuel: Fuel; fuelId: string; reloadFuels?: () => void; }) {
    const { toast } = useToast();

    function removeFuel() {
        deleteFuel(fuelId);

        reloadFuels?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Combustível removido com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente esse combustível.<br /><br />
                        Combustível: {fuel.fuel}<br />
                        Descrição: {fuel.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeFuel}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}