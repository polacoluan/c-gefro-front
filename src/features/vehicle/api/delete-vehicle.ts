// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteVehicle(vehicleId: String): Promise<any> {
    try {
        const API_URL = '/vehicle/'+vehicleId;

        await httpDelete(API_URL);

        return {
            message: 'Veículo deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Veículo');
    }
}
