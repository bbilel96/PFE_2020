import {Command} from "./Command/command";


export interface CommandCustomer {
    id: number;
    state: string;
    longitude: number;
    latitude: number;
    name: string;
    email: string;
    phone: string;
    created_at: string;
    commands: Command[];
    check: boolean;
}
