// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Fleet } from '../types/fleet';

export async function createFleet(data: Fleet): Promise<any> {
    try {
        const API_URL = '/fleet';

        await httpPost(API_URL, {
            fleet: data.fleet,
            description: data.description,
        });

        return {
            message: 'Frota criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Frota');
    }
}