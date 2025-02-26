// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { SubUnity } from '../types/sub-unity';

export async function createSubUnity(data: SubUnity): Promise<any> {
    try {
        const API_URL = '/sub-unity';

        await httpPost(API_URL, {
            sub_unity: data.sub_unity,
            description: data.description,
        });

        return {
            message: 'Sub Unidade criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Sub Unidade');
    }
}