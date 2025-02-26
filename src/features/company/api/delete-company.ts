// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteCompany(companyId: String): Promise<any> {
    try {
        const API_URL = '/company/'+companyId;

        await httpDelete(API_URL);

        return {
            message: 'Orgão deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Orgão');
    }
}
