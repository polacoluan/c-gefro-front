// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Model } from '../types/model';

export async function createModel(data: Model): Promise<any> {
    try {
        const API_URL = '/model';

        await httpPost(API_URL, {
            model: data.model,
            description: data.description,
        });

        return {
            message: 'Tipo criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Tipo');
    }
}