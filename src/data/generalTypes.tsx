export interface User{
    id:number;
    user_id?:number;
    first_name?:string;
    last_name?:string;
    avatar?:string;
    email?:string;
    age?:string;
    role?:"patient" | 'admin' | 'doctor';
    phone_number?:string;
    gender?:"ذكر" | "انثى";
    created_at?:string;
    password:string;
}