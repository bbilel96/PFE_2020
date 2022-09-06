import { User } from './users/user';

export interface Customer extends User{
   
    state:string;
    latitude: number;
    longitude: number;


    
}