// src/app/actions/get-expenses.ts
import { httpGet } from '@/services/api/http';

export async function getVehiclesByCompany(): Promise<any> {

    const API_URL = '/vehicles-by-company/';

    const response = await httpGet(API_URL);
    
    return response;
}
