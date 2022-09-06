import {ExtraCharge} from './extraCharge';


export interface Product {
  id: number;
  family_id: number;
  name: string;
  designation: string;
  order_app: number;
  product_image: FormData;
  extraCharge: ExtraCharge[];
  price: number;
  count: number;

}
