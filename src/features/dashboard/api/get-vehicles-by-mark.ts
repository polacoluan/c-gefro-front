// src/app/actions/get-expenses.ts
import { httpGet } from '@/services/api/http';

export async function getVehiclesByMark(): Promise<any> {

    const API_URL = '/vehicles-by-mark/';

    const response = await httpGet(API_URL);
    
    return response;
}
