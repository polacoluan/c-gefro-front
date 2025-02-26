// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Origin } from '../types/origin';

export async function editOrigin(data: Origin): Promise<any> {
    try {
        const API_URL = '/origin/' + data.id;

        await httpPatch(API_URL, {
            origin: data.origin,
            description: data.description,
        });

        return {
            message: 'Origem criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Origem');
    }
}
