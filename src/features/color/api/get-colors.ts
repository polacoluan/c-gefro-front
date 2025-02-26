import { httpGet } from '@/services/api/http';

export async function getColors(): Promise<any> {
    try {
        const API_URL = '/colors';

        const response: any = await httpGet(API_URL);

        return response;
    } catch (error) {
        throw new Error('Falha ao buscar os marcas');
    }
}