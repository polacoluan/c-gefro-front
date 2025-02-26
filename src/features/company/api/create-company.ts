// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Company } from '../types/company';

export async function createCompany(data: Company): Promise<any> {
    try {
        const API_URL = '/company';

        await httpPost(API_URL, {
            company: data.company,
            description: data.description,
        });

        return {
            message: 'Orgão criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Orgão');
    }
}