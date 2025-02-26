// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Company } from '../types/company';

export async function editCompany(data: Company): Promise<any> {
    try {
        const API_URL = '/company/' + data.id;

        await httpPatch(API_URL, {
            company: data.company,
            description: data.description,
        });

        return {
            message: 'Orgão criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Orgão');
    }
}
