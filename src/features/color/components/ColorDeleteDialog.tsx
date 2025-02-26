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
import { Color } from "../types/color";
import { useToast } from "@/hooks/use-toast";
import { deleteColor } from "../api/delete-color";
import { Trash } from "lucide-react";

export default function DeleteDialog({ color, colorId, reloadColors }: { color: Color; colorId: string; reloadColors?: () => void; }) {
    const { toast } = useToast();

    function removeColor() {
        deleteColor(colorId);

        reloadColors?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Cor removido com sucesso!",
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
                        Cor: {color.color}<br />
                        Descrição: {color.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeColor}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}