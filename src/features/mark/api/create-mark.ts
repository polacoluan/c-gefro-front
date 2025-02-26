// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Mark } from '../types/mark';

export async function createMark(data: Mark): Promise<any> {
    try {
        const API_URL = '/mark';

        await httpPost(API_URL, {
            mark: data.mark,
            description: data.description,
        });

        return {
            message: 'Marca criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Marca');
    }
}