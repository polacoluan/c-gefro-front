// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteOrigin(originId: String): Promise<any> {
    try {
        const API_URL = '/origin/'+originId;

        await httpDelete(API_URL);

        return {
            message: 'Origem deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Origem');
    }
}
