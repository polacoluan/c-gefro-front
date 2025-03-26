import { httpGet } from '@/services/api/http';

export async function findMaintenance(id: string): Promise<any> {
    try {
        const API_URL = `/maintenance/${id}`;

        const response: any = await httpGet(API_URL);

        return response;
    } catch (error) {
        throw new Error('Falha ao buscar a manutenção');
    }
}