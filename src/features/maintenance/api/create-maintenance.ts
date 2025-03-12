// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Maintenance } from '../types/maintenance';

export async function createMaintenance(data: Maintenance): Promise<any> {
    try {
        const API_URL = '/maintenance';

        await httpPost(API_URL, {
            vehicle_id: data.vehicle_id,
            maintenance: data.maintenance,
            description: data.description,
            cost: data.cost,
            kilometers: data.kilometers,
            date: data.date,
            next_maintenance: data.next_maintenance,
        });

        return {
            message: 'Manutenção criada com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Manutenção');
    }
}