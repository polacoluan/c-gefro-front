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
import { Model } from "../types/model";
import { useToast } from "@/hooks/use-toast";
import { deleteModel } from "../api/delete-model";
import { Trash } from "lucide-react";

export default function DeleteDialog({ model, modelId, reloadModels }: { model: Model; modelId: string; reloadModels?: () => void; }) {
    const { toast } = useToast();

    function removeModel() {
        deleteModel(modelId);

        reloadModels?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Modelo removido com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente esse modelo.<br /><br />
                        Modelo: {model.model}<br />
                        Descrição: {model.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeModel}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}