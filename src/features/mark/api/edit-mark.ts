// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Mark } from '../types/mark';

export async function editMark(data: Mark): Promise<any> {
    try {
        const API_URL = '/mark/' + data.id;

        await httpPatch(API_URL, {
            mark: data.mark,
            description: data.description,
        });

        return {
            message: 'Marca criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Marca');
    }
}
