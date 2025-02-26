import { httpGet } from '@/services/api/http';

export async function getFleets(): Promise<any> {
    try {
        const API_URL = '/fleets';

        const response: any = await httpGet(API_URL);

        return response;
    } catch (error) {
        throw new Error('Falha ao buscar os Frotas');
    }
}