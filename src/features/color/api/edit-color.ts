// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Color } from '../types/color';

export async function editColor(data: Color): Promise<any> {
    try {
        const API_URL = '/color/' + data.id;

        await httpPatch(API_URL, {
            color: data.color,
            description: data.description,
        });

        return {
            message: 'Cor criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Cor');
    }
}
