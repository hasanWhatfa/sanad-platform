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

export enum SessionStatus  {
    pending = "pending",
    approved = "accepted",
    cancled = "canceled"
}


export interface Appointment {
    patient_id:number;
    doctor:DoctorMainType;
    scheduled_at:string;
    status:SessionStatus.pending | SessionStatus.approved | SessionStatus.cancled;
    updated_at:string;
    created_at:string;
    id:number;
}


export interface Notification{
    id:string;
    type:string;
    notifiable_type:string;
    notifiable_id:number;
    data:{
        message:string;
        appointment_id:number,
        patient_name:string;
        scheduled_at:string;
    };
    read_at:string;
    created_at:string;
    updated_at:string;
    
}

export interface Session{
    id:number;
    created_at:string;
    scheduled_at:string;
    updated_at:string;
    status:SessionStatus.approved | SessionStatus.pending | SessionStatus.cancled;
    doctor:DoctorMainType;
    patint:User;
}
