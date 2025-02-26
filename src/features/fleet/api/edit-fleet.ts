// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Fleet } from '../types/fleet';

export async function editFleet(data: Fleet): Promise<any> {
    try {
        const API_URL = '/fleet/' + data.id;

        await httpPatch(API_URL, {
            fleet: data.fleet,
            description: data.description,
        });

        return {
            message: 'Frota criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Frota');
    }
}
