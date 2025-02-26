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
import { Status } from "../types/status";
import { useToast } from "@/hooks/use-toast";
import { deleteStatus } from "../api/delete-status";
import { Trash } from "lucide-react";

export default function DeleteDialog({ status, statusId, reloadStatuss }: { status: Status; statusId: string; reloadStatuss?: () => void; }) {
    const { toast } = useToast();

    function removeStatus() {
        deleteStatus(statusId);

        reloadStatuss?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Status removido com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente esse status.<br /><br />
                        Status: {status.status}<br />
                        Descrição: {status.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeStatus}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}