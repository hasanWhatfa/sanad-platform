import axios from "axios";
import { useEffect, useState } from "react";
import { type DoctorMainType, type User } from "../../../../data/generalTypes";
import AddSessionModal from "./AddSessionModal";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { type Appointment } from "../../../../data/generalTypes";
import "./PatientSessions.css";
import { IoRefresh } from "react-icons/io5";



// NEW: Helper function to get the start of the week (Sunday)
const getStartOfWeek = (date: Date): string => {
  const day = date.getDay();
  const diff = date.getDate() - day;
  return new Date(date.setDate(diff)).toISOString().split("T")[0]; // Returns YYYY-MM-DD
};


const PatientSessions = () => {
  const [sessions, setSessions] = useState<Array<Appointment>>();
  const [apiErrorMessage, setApiErrorMessage] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [doctorsList, setDoctorsList] = useState<Array<DoctorMainType>>();
  const [fetchDoctorsErro, setFetchDoctorsApiError] = useState<string>();
  const [isloading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [errorMessage,setErrorMessage] = useState<string>('');
  const user_data_raw = localStorage.getItem('user_data');
  const user_data = user_data_raw ? JSON.parse(user_data_raw) as User : null;
  const user_id = user_data?.id;


  // fetch sessions Function
  const fetchSessions = () => {
    // ... (rest of the function is unchanged)
    const base_url:string ='http://127.0.0.1:8000/api/patient/sessions';
    setIsLoading(true)
    const headers ={
      Accept:"application/json",
      Authorization:`Bearer ${localStorage.getItem("token")}`    
  }
    axios.get(base_url,{headers})
    .then(
      (res)=>{
        setSessions(res.data.data);
        setIsLoading(false);
      }
    )
    .catch(err=>{
      setApiErrorMessage("couldn't fetch your sessions , relod the page");
      console.log(err)
    });
  };
  // fetch doctors
  const getDoctors = () => {
    // ... (rest of the function is unchanged)
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
  };

  // NEW: Updated logic for handling the "Add Session" button click
  const handleAddSession = () => {
    const userId = user_id
    if (!userId) {
      setErrorMessage("لم يتم التحقق من المستخدم, رجاء قم باعادة تسحيل الدخول.");
      return;
    }
    setErrorMessage('');
    const planKey = `user_plan_${userId}`;
    const storedPlanData = localStorage.getItem(planKey);

    if (storedPlanData) {
      // User has a plan, now check their session limit
      let planData = JSON.parse(storedPlanData);
      
      // Weekly Reset Logic
      const today = new Date();
      const currentWeekStart = getStartOfWeek(today);

      if (planData.weekStartDate !== currentWeekStart) {
        console.log("New week detected! Resetting session count.");
        planData.sessionsUsed = 0;
        planData.weekStartDate = currentWeekStart;
        // Save the updated data back to localStorage
        localStorage.setItem(planKey, JSON.stringify(planData));
      }

      // Check if they can book a new session
      if (planData.sessionsUsed < planData.sessionsPerWeek) {
        // They have sessions available, show the modal to add a new one
        setShowModal(true);
      } else {
        // They reached their limit
        setErrorMessage(`
          عذرا,لقد استهلكت كامل جلساتك لهذا الاسبوع,
          عدد الجلسات المستخدمة هو:
          ${planData.sessionsPerWeek}
          `);
      }
      setTimeout(()=>{
        setErrorMessage('')
      },2300)

    } else {
      // User does not have a plan, redirect them
      setErrorMessage("عليك ان تختار باقة لكي تتمكن من اضافة الجلسات.");
      navigate('/patient-dash/plans'); // Make sure this route is correct!;
      setTimeout(()=>{
        setErrorMessage('')
      },2300)
    }
  };

  const getDate = (fulDate: string) => {
    // ... (rest of the function is unchanged)
    const sessDate = new Date(fulDate);
    const year = sessDate.getFullYear();
    const month = String(sessDate.getMonth() + 1).padStart(2, "0");
    const day = String(sessDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getHours = (fulDate: string) => {
    // ... (rest of the function is unchanged)
    const sessDate = new Date(fulDate);
    const hours = String(sessDate.getHours()).padStart(2, "0");
    const minutes = String(sessDate.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getDoctorName = (doctor: DoctorMainType): string => {
    return `${doctor.first_name} ${doctor.last_name}`
  };

  useEffect(() => {
    fetchSessions();
    getDoctors();
  }, []);

  return (
    <main className="patient-sessions-page p60">
      {errorMessage && <p className="error_message_last_edit">{errorMessage}</p>}
      <AddSessionModal 
      doctorsList={doctorsList} 
      showModal={showModal} 
      setShowModal={setShowModal}
      fetchDoctorsErro={fetchDoctorsErro}
      onSessionBooked={fetchSessions}
      errorMessage={errorMessage}
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
        <button className={`refresh_btn ${isloading ? 'loading' : ''}`} onClick={fetchSessions}>
          <IoRefresh />
        </button>
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
                    <td>{getDoctorName(ses.doctor)}</td>
                    <td>{ses.status}</td>
                    <td>{getDate(ses.scheduled_at)}</td>
                    <td>{getHours(ses.scheduled_at)}</td>
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
  );
};

export default PatientSessions;