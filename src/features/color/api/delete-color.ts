// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteColor(colorId: String): Promise<any> {
    try {
        const API_URL = '/color/'+colorId;

        await httpDelete(API_URL);

        return {
            message: 'Cor deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Cor');
    }
}
