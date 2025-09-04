// DoctorDashboardHome.tsx

import React, { useEffect, useState } from 'react';
import '../DashboardsGlobalStyles.css';
import { Link } from 'react-router-dom'; 

import { 
    FaUserInjured, 
    FaCalendarCheck, 
    FaStar, 
    FaUsers, 
    FaUserEdit, 
    FaThList, 
    FaFileMedical 
} from 'react-icons/fa';
import { image_base, SessionStatus, type Session, type User } from '../../../data/generalTypes';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../redux/store';
import { fetchPateins } from '../../../redux/slices/PatientsSlice';
import axios from 'axios';
import {type RateResponse } from '../../../data/generalTypes';
import EditDoctorInfoModal from './EditDoctorInfoModal';
import { FaNewspaper } from 'react-icons/fa6';




// Helper component to render stars
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="star-rating">
        {[...Array(5)].map((_, index) => (
            <FaStar key={index} className={index < rating ? 'filled' : 'empty'} />
        ))}
    </div>
);


const DoctorDashboardHome: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {patients} = useSelector((state: RootState) => state.patients);
    const [sessions,setSession] = useState<Session[]>([]);
    const [ratings,setRatings] = useState<RateResponse[]>([])
    const [showModal,setShowModal] = useState<boolean>(false)
    const rawData = localStorage.getItem("user_data");
    const user_data = rawData? JSON.parse(rawData) as User : null;
    const doctorName = `${user_data?.first_name} ${user_data?.last_name}`;

    const uniquePatients = Array.from(
    new Map(patients.map((p) => [p.id ?? p.user_id, p])).values()
    );
    const totalPatients = uniquePatients.length;
    
    const fetchSession = ()=>{
      const base_url : string = "http://127.0.0.1:8000/api/doctor/sessions";
      axios.get(base_url,{
        headers:{
          Accept:'application/json',
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        setSession(res.data.data);
      })
      .catch((err)=>{console.log(err)})
    }
    const approvedSessions = sessions.filter((ses)=>ses.status == SessionStatus.approved);

    const sessionsDate = approvedSessions.map((ses)=>{
       return new Date(ses.scheduled_at.replace(" ","T"))
    });

    const today = new Date();
    const todaysAppointment_arr = sessionsDate.filter((date)=>{
      date.getFullYear == today.getFullYear &&  
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    })

    const todaysAppointments : number =  todaysAppointment_arr.length;

    // today requests..

    // ==this array contains the pending sessions
      const penedingSessions = sessions.filter((ses)=>ses.status == SessionStatus.pending);
    // this array -must- contain the sessions that are requested today.
      const finalTR = penedingSessions.filter((ses)=>{
        const dateSes = new Date(ses.scheduled_at.replace(" ","T"));
        return(
          dateSes.getFullYear() === today.getFullYear() &&
          dateSes.getMonth() === today.getMonth() &&
          dateSes.getDate() === today.getDate()
        )
      })
    // rates
    const fetchRates = ()=>{
      const base_url : string = "http://127.0.0.1:8000/api/doctor/ratings"
      axios.get(base_url,{
        headers:{
          Accept:"application/json",
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res)=>{
        setRatings(res.data.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  const showEditInfoModal=()=>{
    setShowModal(true);
  }
  const closeModal=()=>{
    setShowModal(false)
  }
    useEffect(() => {
      dispatch(fetchPateins());
      fetchSession();
      fetchRates()
    }, [dispatch]);
    return (
        <div className="dashboard-container">

            <header className="dashboard-header">
                <h1>أهلاً بعودتك، د. {doctorName}</h1>
                <p>إليك ملخص نشاطك لهذا اليوم.</p>
            </header>
            {
              showModal &&
              <EditDoctorInfoModal isOpen={showModal} onClose={closeModal} currentUser={
                {
                  firstName:user_data?.first_name,
                  lastName:user_data?.last_name,
                  avatar:user_data?.avatar,
                  email:user_data?.email
                }
              }/>
            }
            <main className="dashboard-grid">
                
                {/* --- STATS & LINKS --- */}
                <div className="card stat-card total-patients-card">
                    <FaUsers className="card-icon" />
                    <h3>{totalPatients}</h3>
                    <p>إجمالي المرضى</p>
                </div>

                <div className="card stat-card today-appointments-card">
                    <FaCalendarCheck className="card-icon" />
                    <h3>{todaysAppointments}</h3>
                    <p>مواعيد اليوم</p>
                </div>

                <Link to="doctor-patients" className="card link-card">
                    <FaUserInjured className="card-icon" />
                    <h4>إدارة المرضى</h4>
                    <p>عرض وتعديل ملفات المرضى</p>
                </Link>

                <Link to="doctor-sessions" className="card link-card">
                    <FaThList className="card-icon" />
                    <h4>الجلسات المعتمدة</h4>
                    <p>عرض وإدارة الجلسات القادمة</p>
                </Link>

                <button 
                className="card link-card"
                onClick={showEditInfoModal}
                >
                    <FaUserEdit className="card-icon" />
                    <h4>تعديل الملف الشخصي</h4>
                    <p>تحديث معلوماتك وبياناتك</p>
                </button>
                <button 
                  className="card link-card add-article-btn"
                  aria-label="إضافة مقالة"
                  // no events — زر فقط للعرض
                >
                    <FaNewspaper className="card-icon" />
                    <h4>إضافة مقالة</h4>
                    <p>اكتب مقالًا للمجلة/المدونة</p>
                </button>



                {/* --- APPOINTMENT REQUESTS --- */}
                <div className="card appointments-card">
                    <div className="card-header">
                        <FaFileMedical />
                        <h2>مواعيد اليوم</h2>
                    </div>
                    <div className="table-container">
                      {
                        finalTR.length > 0 ?
                        <table>
                            <thead>
                                <tr>
                                    <th>المريض</th>
                                    <th>الوقت</th>
                                    <th>الإجراء</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finalTR.map(req => (
                                    <tr key={req.id}>
                                        <td>
                                            <div className="patient-info">
                                                <img src={`${image_base}/${req.patint.avatar}`} alt={req.patint.first_name} />
                                                <span>{`${req.patint.first_name} ${req.patint.last_name}`}</span>
                                            </div>
                                        </td>
                                        <td>{req.scheduled_at.slice(0,req.scheduled_at.indexOf(" "))}</td>
                                        <td>
                                            <button className="btn-approve">قبول</button>
                                            <button className="btn-reject">رفض</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        :
                        <p>ليس لديك مواعيد اليوم.</p>
                      }
                    </div>
                </div>
                {/* --- PATIENT RATINGS --- */}
                <div className="card ratings-card">
                    <div className="card-header">
                        <FaStar />
                        <h2>تقييمات المرضى</h2>
                    </div>
                    <div className="ratings-list">
                        {ratings.length > 0 ? ratings.map(rating => (
                            <div key={rating.id} className="rating-item">
                                <div className="rating-header">
                                    <strong>{`${rating.patient.first_name} ${rating.patient.last_name}`}</strong>
                                    <StarRating rating={rating.rate} />
                                </div>
                                <p className="rating-comment">"{rating.comment}"</p>
                            </div>
                        ))
                        :
                        <p>ليس لديك تقييمات.</p>
                      }
                    </div>
                </div>

            </main>
        </div>
    );
};

export default DoctorDashboardHome;