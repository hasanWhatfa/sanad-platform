// PatientDoctors.tsx
import { useEffect, useRef, useState } from "react";
import "./PatientRate.css";
import axios from "axios";
import type { DoctorMainType } from "../../../../data/generalTypes";
import { image_base } from "../../../../data/generalTypes";
import { CgAdd } from "react-icons/cg";
import AddCommentModal from "./AddCommentModal";

interface CommentShape{
    comment: string;
    created_at: string;
    doctor_id: number
    id: number;
    patient_id: number;
    rate: number;
    updated_at: string;
}

export default function PatientDoctors() {
  const [doctors,setDoctors] = useState<DoctorMainType[]>([]);
  const [openModal,setOpenModal] = useState<boolean>(false);
  const [choosenDoctor,setChoosenDoctor] = useState<number | undefined>(0);
  const [choosenDoctorName,setName] = useState<string | undefined>('');
  const fetchDoctors = ()=>{
    axios.get('http://127.0.0.1:8000/api/patient/doctors',{
      headers:{
        Accept:"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res)=>{
      console.log(res.data.data)
      setDoctors(res.data.data);
    })
    .catch((err)=>console.log(err))
  }

  const openAddCommentModal = (docId:number | undefined, doctorName:string | undefined)=>{
    setOpenModal(true);
    setChoosenDoctor(docId);
    setName(doctorName)
  }

  const cardsRef = useRef<HTMLDivElement[]>([]);
  useEffect(()=>{
    fetchDoctors();
  },[])
  return (
    <>
    <div className="doctors-page">
      <h2 className="page-title">الأطباء الذين تتعالج لديهم</h2>
      <div className="doctors-grid">
        {doctors?.map((doc, i) => (
          <div
            key={doc.id}
            className="doctor-card"
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
          >
            <div className="card-header"></div>
            <div className="doctor-img-wrapper">
              <img src={`${image_base}/${doc.avatar}`} alt={doc.first_name} className="doctor-image" />
            </div>
            <div className="card-body">
              <h3 className="doctor-name">{`${doc.first_name} ${doc.last_name}`}</h3>
              <p className="doctor-specialty">{doc.specialization}</p>
              <button 
              className="rating-btn"
              onClick={()=>openAddCommentModal(doc?.id,`${doc.first_name} ${doc.last_name}`)}
              >إضافة تقييم<CgAdd className="addCommentBtn"/>
              </button>
            </div>
          </div>
        ))}
      </div>
      {
      openModal &&
      <AddCommentModal openModalSetter={setOpenModal} choosenDoctor={choosenDoctor}  choosenDoctorName={choosenDoctorName} />
      }
    </div>

    </>
  );
}
