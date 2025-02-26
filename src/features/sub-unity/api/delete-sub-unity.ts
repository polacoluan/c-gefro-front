// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteSubUnity(subUnityId: String): Promise<any> {
    try {
        const API_URL = '/sub-unity/'+subUnityId;

        await httpDelete(API_URL);

        return {
            message: 'Sub Unidade deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Sub Unidade');
    }
}
