// src/app/actions/get-expenses.ts
import { httpGet } from '@/services/api/http';

export async function getVehiclesByOrigin(): Promise<any> {

    const API_URL = '/vehicles-by-origin/';

    const response = await httpGet(API_URL);
    
    return response;
}
