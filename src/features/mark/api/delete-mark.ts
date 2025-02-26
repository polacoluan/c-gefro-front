// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteMark(markId: String): Promise<any> {
    try {
        const API_URL = '/mark/'+markId;

        await httpDelete(API_URL);

        return {
            message: 'Marca deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Marca');
    }
}
