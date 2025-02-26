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
import { Origin } from "../types/origin";
import { useToast } from "@/hooks/use-toast";
import { deleteOrigin } from "../api/delete-origin";
import { Trash } from "lucide-react";

export default function DeleteDialog({ origin, originId, reloadOrigins }: { origin: Origin; originId: string; reloadOrigins?: () => void; }) {
    const { toast } = useToast();

    function removeOrigin() {
        deleteOrigin(originId);

        reloadOrigins?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Origem removido com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente esse origem.<br /><br />
                        Origem: {origin.origin}<br />
                        Descrição: {origin.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeOrigin}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}