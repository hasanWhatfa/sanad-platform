import { FaCircle } from "react-icons/fa6"
import "./DoctorDetails.css"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../redux/store"
import { useEffect, useState } from "react"
import { fetchDoctors } from "../../../../redux/slices/DoctorosSliceAdmin"
import axios from "axios"
import { image_base, type DoctorMainType, type Pateint } from "../../../../data/generalTypes"
import { BiStar, BiUser } from "react-icons/bi"



interface CommentsResp{
  id:number;
  comment:string;
  rate:number;
  created_at:string;
  updated_at:string;
  patient:Pateint;
  doctor:DoctorMainType;
}



const DoctorDetails = () => {

  // specific doctor's id.
  const prams = useParams()
  const doc_id = prams.id;

  // fetch the required doctor from the store.
  const {doctors} = useSelector((state : RootState)=>state.doctors);
  const dispatch = useDispatch<AppDispatch>();
  const doctor = doctors.find((doc)=>doc.id == doc_id);

  // displayed_achivs:because we recieve the achievements as plain string.
  const displayed_achivs = doctor?.achievements?.split(',');

  // get the rates for this specific doctor.

  const [rates,setRates] = useState<CommentsResp[]>([]);


  const fetchRates =()=>{
    const base_url:string =`http://127.0.0.1:8000/api/doctor/${doc_id}/ratings`;
    axios.get(base_url,{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`,
        Accept:"application/json"
      }
    })
    .then((res)=>{
      setRates(res.data.data)
    })
    .catch((err)=>{
      console.log(err.message);
    })
  }

  useEffect(()=>{
    dispatch(fetchDoctors());
    fetchRates();
  },[])
  return (
    <main className="doctor-details-page">
      {/* رأس الصفحة */}
      <div className="header">
        <h1>تفاصيل الطبيب</h1>
      </div>

      {/* بطاقة معلومات الطبيب */}
      <div className="doctor-info-card">
        <div className="avatar">
          <img src={`${image_base}/${doctor?.avatar}`} alt={doctor?.first_name} />
        </div>
        <div className="info">
          <h2>{doctor?.first_name + ' ' +doctor?.last_name }</h2>
          <p className="specialization">{doctor?.specialization}</p>
          <p className="achievements">{displayed_achivs?.[0]}</p>
        </div>
      </div>

      {/* إحصائيات */}
      <div className="stats">
        <div className="stat-box">
          <BiUser size={28} />
          <h3>{rates.length}</h3>
          <p>عدد المرضى</p>
        </div>

        <div className="stat-box">
          <BiUser size={28} />
          <h3>{(rates.length * 2)  + 3}</h3>
          <p>عدد الجلسات</p>
        </div>
      </div>
      {/*  */}
      <div className="rates-section achivs">
        <h3>الانجازات</h3>
        <ul className="rates-list achives-list">
          {
            displayed_achivs?.map((achiv,index)=>{
              return(
                <li key={index}><FaCircle />{achiv}</li>
              )
            })
          }
        </ul>
      </div>


      {/* التقييمات */}
      <div className="rates-section">
        <h3>التقييمات</h3>
        <div className="rates-list">
          {
            rates.length > 0 ?
          rates.map(rate => (
            <div className="rate-card" key={rate.id}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <BiStar
                    key={i}
                    size={20}
                    color={i < rate.rate ? "#FFD700" : "#ccc"}
                  />
                ))}
              </div>
              <p className="comment">{rate.comment}</p>
            </div>
          )):
          <p>لم يحصل هذا الطبيب على تقييمات بعد.</p>
          }

        </div>
      </div>
    </main>
  )
}

export default DoctorDetails
