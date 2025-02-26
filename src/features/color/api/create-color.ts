// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Color } from '../types/color';

export async function createColor(data: Color): Promise<any> {
    try {
        const API_URL = '/color';

        await httpPost(API_URL, {
            color: data.color,
            description: data.description,
        });

        return {
            message: 'Cor criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar COr');
    }
}