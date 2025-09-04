import { Link } from "react-router-dom";
import { image_base, type User } from "../../../../data/generalTypes";
import type { Note } from "./DoctorNotesSection";

interface PatientCardProps{
    patient:{
        age?: number;
        avatar?: string
        created_at?:string;
        email?: string;
        first_name?: string;
        gender?: string;
        id?: number;
        last_name?:string;
        phone_number?: string;
        role?: string;
        user_id?: number;
    }
}
const PatientCard = ({patient}: PatientCardProps) => {
    const NOTES_STORAGE_KEY = "sanad_doctor_notes_v2";

    function getPatientNotes(doctorId: string, patientId: string) : Note[]{
    try {
        const allNotesRaw = localStorage.getItem(NOTES_STORAGE_KEY);
        if (!allNotesRaw) return [];

        const allNotes = JSON.parse(allNotesRaw);
        return allNotes?.[doctorId]?.[patientId] || [];
    } catch (err) {
        console.error("Failed to parse notes:", err);
        return [];
    }
    }
    const user_data_raw = localStorage.getItem('user_data');
    const user_data: User | null = user_data_raw ? JSON.parse(user_data_raw) : null;
    const doctor_id = user_data?.id;

    const notes = getPatientNotes(String(doctor_id),String(patient.id));
    const displayedNotes = notes.slice(0,2);
    const expected_illnes : string = 'اكتئاب حاد'
  return (
    <div className="patient_card">
        <div className="header">
            <h3 className="p_name">{`${patient.first_name} ${patient.last_name}` }</h3>
            <img src={`${image_base}/${patient.avatar}`} alt={patient.first_name} className="p_image"/>
        </div>
        <div className="details">
            <p>
                العمر: 
                <span className="pat_val">
                    {patient.age}
                </span>
            </p>
            <p>
                الجنس:
                <span className="pat_val">
                    {patient.gender}
                </span>
            </p>
            <div className="expected_illness">
                <p>الحالة المتوقعة</p>
                <div>
                    <p>{expected_illnes}</p>
                </div>
            </div>
            <div className="notes">
                <p>الملاحظات</p>
                <div className="notes_container">     
                    {
                    notes.length > 0 ?  
                    displayedNotes.map((note)=>{
                        return <div className="note"><p>-{note.text}</p></div>
                    }):
                    <p>ليس لدى 
                        {' ' +patient.first_name + ' '}
                        ملاحظات بعد.
                    </p>
                    }
                </div>
            </div>
            <Link to={`patient-details/${patient.id}`}>عرض تفاصيل المريض</Link>
        </div>
    </div>
  )
}

export default PatientCard
