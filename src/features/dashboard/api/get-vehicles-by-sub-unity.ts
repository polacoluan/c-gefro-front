// src/app/actions/get-expenses.ts
import { httpGet } from '@/services/api/http';

export async function getVehiclesBySubUnity(): Promise<any> {

    const API_URL = '/vehicles-by-sub-unity/';

    const response = await httpGet(API_URL);
    
    return response;
}
