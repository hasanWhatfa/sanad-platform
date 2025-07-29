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

export interface DoctorMainType {
    user_id?:number;
    id?:number;
    first_name?:string;
    last_name?:string;
    avatar?:string;
    achievements?:string;
    email?:string;
    specialization?:string;
    phone_number?:string;
    role?:"doctor";
    created_at?:string;
}

export const image_base : string = "http://127.0.0.1:8000/storage";

enum SessionStatus  {
    pending = "pending",
    approved = "approved",
    cancled = "canceled"
}


export interface Appointment {
    patient_id:number;
    doctor_id:string;
    scheduled_at:string;
    status:SessionStatus.pending | SessionStatus.approved | SessionStatus.cancled;
    updated_at:string;
    created_at:string;
    id:number;
}

