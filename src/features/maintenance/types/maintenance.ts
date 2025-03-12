export type Maintenance = {
    id: string;
    vehicle_id: string;
    maintenance: string;
    description: string;
    cost: string;
    kilometers: string;
    date: string;
    next_maintenance: string;
    is_default: boolean;
    installments: boolean;
}