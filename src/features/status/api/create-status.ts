// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Status } from '../types/status';

export async function createStatus(data: Status): Promise<any> {
    try {
        const API_URL = '/status';

        await httpPost(API_URL, {
            status: data.status,
            description: data.description,
        });

        return {
            message: 'Status criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Status');
    }
}