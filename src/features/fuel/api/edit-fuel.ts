// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Fuel } from '../types/fuel';

export async function editFuel(data: Fuel): Promise<any> {
    try {
        const API_URL = '/fuel/' + data.id;

        await httpPatch(API_URL, {
            fuel: data.fuel,
            description: data.description,
        });

        return {
            message: 'Combustível criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Combustível');
    }
}
