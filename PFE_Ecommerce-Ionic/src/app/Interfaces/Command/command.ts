import { Family} from '../products/family';

export interface Command {
    id: number;
    date_command: string;
    state: string;
    latitude_del: number;
    longitude_del: number;
    customer_id: number;
    products: Family[];
    command_type: string;
    total_price: number;
}
