import { httpGet } from '@/services/api/http';

export async function findVehicle(id: string): Promise<any> {
    try {
        const API_URL = `/vehicle/${id}?include=maintenances`;

        const response: any = await httpGet(API_URL);

        return response;
    } catch (error) {
        throw new Error('Falha ao buscar os veículos');
    }
}