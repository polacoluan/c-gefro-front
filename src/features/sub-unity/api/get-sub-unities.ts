import { httpGet } from '@/services/api/http';

export async function getSubUnities(): Promise<any> {
    try {
        const API_URL = '/sub-unities';

        const response: any = await httpGet(API_URL);

        return response;
    } catch (error) {
        throw new Error('Falha ao buscar os sub unidades');
    }
}