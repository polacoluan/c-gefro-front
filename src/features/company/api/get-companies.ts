import { httpGet } from '@/services/api/http';

export async function getCompanies(): Promise<any> {
    try {
        const API_URL = '/companies?limit=0';

        const response: any = await httpGet(API_URL);

        return response;
    } catch (error) {
        throw new Error('Falha ao buscar os Orgãos');
    }
}