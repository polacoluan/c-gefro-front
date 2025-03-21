// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Type } from '../types/type';

export async function createType(data: Type): Promise<any> {
    try {
        const API_URL = '/type';

        await httpPost(API_URL, {
            type: data.type,
            description: data.description,
        });

        return {
            message: 'Tipo criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Tipo');
    }
}