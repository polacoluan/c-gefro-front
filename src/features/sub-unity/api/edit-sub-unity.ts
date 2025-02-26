// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { SubUnity } from '../types/sub-unity';

export async function editSubUnity(data: SubUnity): Promise<any> {
    try {
        const API_URL = '/sub-unity/' + data.id;

        await httpPatch(API_URL, {
            sub_unity: data.sub_unity,
            description: data.description,
        });

        return {
            message: 'Sub Unidade criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Sub Unidade');
    }
}
