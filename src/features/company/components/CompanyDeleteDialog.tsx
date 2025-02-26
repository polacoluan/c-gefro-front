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
import { Company } from "../types/company";
import { useToast } from "@/hooks/use-toast";
import { deleteCompany } from "../api/delete-company";
import { Trash } from "lucide-react";

export default function DeleteDialog({ company, companyId, reloadCompanies }: { company: Company; companyId: string; reloadCompanies?: () => void; }) {
    const { toast } = useToast();

    function removeCompany() {
        deleteCompany(companyId);

        reloadCompanies?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Orgão removido com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente esse Orgão.<br /><br />
                        Orgão: {company.company}<br />
                        Descrição: {company.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeCompany}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}