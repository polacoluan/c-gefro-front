// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteFuel(fuelId: String): Promise<any> {
    try {
        const API_URL = '/fuel/'+fuelId;

        await httpDelete(API_URL);

        return {
            message: 'Combustível deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Combustível');
    }
}
