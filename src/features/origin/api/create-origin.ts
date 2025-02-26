// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Origin } from '../types/origin';

export async function createOrigin(data: Origin): Promise<any> {
    try {
        const API_URL = '/origin';

        await httpPost(API_URL, {
            origin: data.origin,
            description: data.description,
        });

        return {
            message: 'Origem criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Origem');
    }
}