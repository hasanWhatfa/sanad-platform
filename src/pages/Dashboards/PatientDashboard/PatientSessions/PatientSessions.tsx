import axios from "axios"
import { useEffect, useState } from "react"
import {type DoctorMainType } from "../../../../data/generalTypes";
import AddSessionModal from "./AddSessionModal";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import {type Appointment } from "../../../../data/generalTypes";
import './PatientSessions.css'

const PatientSessions = () => {
  const [sessions,setSessions] = useState<Array<Appointment>>();
  const [apiErrorMessage,setApiErrorMessage] = useState<string>();
  const [showModal,setShowModal] = useState<boolean>(false);
  const [doctorsList,setDoctorsList] = useState<Array<DoctorMainType>>();
  const [fetchDoctorsErro,setFetchDoctorsApiError] = useState<string>();
  const navigate = useNavigate();

  // get doctors names to use it in the table
  const doctorsName = (doctorsList ?? []).map((doc) => ({
    docName: `${doc.first_name} ${doc.last_name}`,
    docId: doc.id,
  }));
  
  // fetch sessions Function
  const fetchSessions = ()=>{
    const base_url:string ='http://127.0.0.1:8000/api/patient/sessions'
    const headers ={
      Accept:"application/json",
      Authorization:`Bearer ${localStorage.getItem("token")}`    
  }
    axios.get(base_url,{headers})
    .then(
      (res)=>{
        setSessions(res.data.data);
      }
    )
    .catch(err=>{
      setApiErrorMessage("couldn't fetch your sessions , relod the page");
      console.log(err)
    });
  }
  // fetch doctors
  const getDoctors = ()=>{
    const base_url : string = 'http://127.0.0.1:8000/api/patient/doctors';

    axios.get(base_url,{
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res)=>{
      setDoctorsList(res.data.data);
    })
    .catch((err)=>{setFetchDoctorsApiError('لا يمكننا جلب قائمة الاطباء الان, حاول لاحقا.');
      console.log(err)
    });
  }

  // handle clicking on add session btn.
  const handleAddSession = ()=>{
    setShowModal((prev)=>!prev);
  }


  const getDoctorName = (id: string) => {
    const doctor = doctorsList?.find((doc) => doc.id === Number(id));
    return doctor ? `${doctor.first_name} ${doctor.last_name}` : "غير معروف";
  }

  const getDate = (fulDate: string) => {
    const sessDate = new Date(fulDate);
    const year = sessDate.getFullYear();
    const month = String(sessDate.getMonth() + 1).padStart(2, "0");
    const day = String(sessDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  const getHours = (fulDate: string) => {
    const sessDate = new Date(fulDate);
    const hours = String(sessDate.getHours()).padStart(2, "0");
    const minutes = String(sessDate.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(()=>{
  fetchSessions();
  getDoctors();
  },[]);
  
  return (
    <main className="patient-sessions-page p60">
      <AddSessionModal 
      doctorsList={doctorsList} 
      showModal={showModal} 
      setShowModal={setShowModal}
      fetchDoctorsErro={fetchDoctorsErro}
      />

      {/* error message in case fetching sessions didn't go well */}
      {
        apiErrorMessage &&
        <p className="apiErrorMessage">{apiErrorMessage}</p>
      }

      <div className="top_section">
        <button className="goBackBtn" onClick={()=>navigate('/patient-dash')}>
          <TiArrowBack />
        </button>
        <button onClick={handleAddSession} className="AddSessionBTn happy_font">
          <IoMdAdd />
          اضافة جلسة
        </button>
      </div>
      <div className="show-sessions-table">
        <table>
          <thead>
              <th className="happy_font">معرف الجلسة</th>
              <th className="happy_font">الطبيب</th>
              <th className="happy_font">الحالة</th>
              <th className="happy_font">التاريخ</th>
              <th className="happy_font">الوقت</th>
          </thead>
          <tbody>

            {sessions && sessions?.length > 0 ? (

              sessions?.map((ses)=>{
                return(
                  <tr key={ses.id}>
                    <td>{ses.id}</td>
                    <td>{getDoctorName(ses.doctor_id)}</td>
                    <td>{ses.status}</td>
                    <td>{getDate(ses.created_at)}</td>
                    <td>{getHours(ses.created_at)}</td>
                  </tr>
                )
              })
            ): (
              <tr>
                <td colSpan={5} className="noSessionsYet">ليس لديك اي جلسات بعد.</td>
              </tr>
            )
           }
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default PatientSessions
