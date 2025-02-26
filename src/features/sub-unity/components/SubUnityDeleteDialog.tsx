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
import { SubUnity } from "../types/sub-unity";
import { useToast } from "@/hooks/use-toast";
import { deleteSubUnity } from "../api/delete-sub-unity";
import { Trash } from "lucide-react";

export default function DeleteDialog({ subUnity, subUnityId, reloadSubUnities }: { subUnity: SubUnity; subUnityId: string; reloadSubUnities?: () => void; }) {
    const { toast } = useToast();

    function removeSubUnity() {
        deleteSubUnity(subUnityId);

        reloadSubUnities?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Sub Unidade removido com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente esse sub unidade.<br /><br />
                        Sub Unidade: {subUnity.sub_unity}<br />
                        Descrição: {subUnity.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeSubUnity}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}