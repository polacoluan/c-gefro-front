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
import { Mark } from "../types/mark";
import { useToast } from "@/hooks/use-toast";
import { deleteMark } from "../api/delete-mark";
import { Trash } from "lucide-react";

export default function DeleteDialog({ mark, markId, reloadMarks }: { mark: Mark; markId: string; reloadMarks?: () => void; }) {
    const { toast } = useToast();

    function removeMark() {
        deleteMark(markId);

        reloadMarks?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Marca removido com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente esse marca.<br /><br />
                        Marca: {mark.mark}<br />
                        Descrição: {mark.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeMark}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}