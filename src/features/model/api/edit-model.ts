// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Model } from '../types/model';

export async function editModel(data: Model): Promise<any> {
    try {
        const API_URL = '/model/' + data.id;

        await httpPatch(API_URL, {
            model: data.model,
            description: data.description,
        });

        return {
            message: 'Modelo criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Modelo');
    }
}
