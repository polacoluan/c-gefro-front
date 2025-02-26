// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteStatus(statusId: String): Promise<any> {
    try {
        const API_URL = '/status/'+statusId;

        await httpDelete(API_URL);

        return {
            message: 'Status deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Status');
    }
}
