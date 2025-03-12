// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteMaintenance(maintenanceId: String): Promise<any> {
    try {
        const API_URL = '/maintenance/'+maintenanceId;

        await httpDelete(API_URL);

        return {
            message: 'Manutenção deletada com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Manutenção');
    }
}
