import { httpGet } from '@/services/api/http';

export async function getVehicles(): Promise<any> {
    try {
        const API_URL = '/vehicles';

        const response: any = await httpGet(API_URL);

        return response;
    } catch (error) {
        throw new Error('Falha ao buscar os veículos');
    }
}