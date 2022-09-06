import { Product } from './product';


export interface Family {
  id: number;
  name:string;
  family_id:string;
  order_appearance:number;
  subfamily_image: string;
  sub_families: Family[];
  products: Product[];


}
