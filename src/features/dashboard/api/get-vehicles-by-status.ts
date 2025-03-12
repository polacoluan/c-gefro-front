// src/app/actions/get-expenses.ts
import { httpGet } from '@/services/api/http';

export async function getVehiclesByStatus(): Promise<any> {

    const API_URL = '/vehicles-by-status/';

    const response = await httpGet(API_URL);
    
    return response;
}
