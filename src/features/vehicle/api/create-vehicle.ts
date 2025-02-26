// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Vehicle } from '../types/vehicle';

export async function createVehicle(data: Vehicle): Promise<any> {
    try {
        const API_URL = '/vehicle';

        await httpPost(API_URL, {
            plate: data.plate,
            prefix: data.prefix,
            tracker: data.tracker,
            chassis: data.chassis,
            engine_number: data.engine_number,
            renavam: data.renavam,
            year: data.year,
            color_id: data.color_id,
            company_id: data.company_id,
            fleet_id: data.fleet_id,
            fuel_id: data.fuel_id,
            mark_id: data.mark_id,
            model_id: data.model_id,
            origin_id: data.origin_id,
            status_id: data.status_id,
            sub_unity_id: data.sub_unity_id,
            type_id: data.type_id,
        });

        return {
            message: 'Veículo criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Veículo');
    }
}