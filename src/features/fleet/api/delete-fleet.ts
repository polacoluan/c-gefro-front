// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteFleet(fleetId: String): Promise<any> {
    try {
        const API_URL = '/fleet/'+fleetId;

        await httpDelete(API_URL);

        return {
            message: 'Frota deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Frota');
    }
}
