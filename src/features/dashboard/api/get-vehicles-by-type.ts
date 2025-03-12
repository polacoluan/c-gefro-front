// src/app/actions/get-expenses.ts
import { httpGet } from '@/services/api/http';

export async function getVehiclesByType(): Promise<any> {

    const API_URL = '/vehicles-by-type/';

    const response = await httpGet(API_URL);
    
    return response;
}
