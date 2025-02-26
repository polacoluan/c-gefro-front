// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Status } from '../types/status';

export async function editStatus(data: Status): Promise<any> {
    try {
        const API_URL = '/status/' + data.id;

        await httpPatch(API_URL, {
            status: data.status,
            description: data.description,
        });

        return {
            message: 'Status criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Status');
    }
}
