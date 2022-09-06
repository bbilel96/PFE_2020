
import { ExtraCharge } from './extra-charge';

export interface Product {
    id: number;
    family_id: number;
    name: string;
    designation: string;
    order_app: number;
    product_image: string;
    extraCharge: ExtraCharge[];
    price: number;
    count: number;

}
