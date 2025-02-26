// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Fuel } from '../types/fuel';

export async function createFuel(data: Fuel): Promise<any> {
    try {
        const API_URL = '/fuel';

        await httpPost(API_URL, {
            fuel: data.fuel,
            description: data.description,
        });

        return {
            message: 'Combustível criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Combustível');
    }
}