// AdminDashMainPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashMainPage.css";
import { image_base, type Session } from "../../../data/generalTypes";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { fetchAllPateins } from "../../../redux/slices/PatientsAdminSlice";
import { fetchDoctors } from "../../../redux/slices/DoctorosSliceAdmin";
import axios from "axios";
import EditAdminModal from "./EditAdminModal";
import { fetchTransactions } from "../../../redux/slices/FinincialSlice";



const formatTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
};





const StatCard: React.FC<{ title: string; value: number | string; subtitle?: string }> = ({
  title,
  value,
  subtitle,
}) => (
  <div className="stat-card">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
    {subtitle && <div className="stat-sub">{subtitle}</div>}
  </div>
);

const AdminDashMainPage: React.FC = () => {
    const [showModal,setShowModal] = useState<boolean>(false);
    const onClose = ()=>{
      setShowModal(false);
    }
  // fetch all patients to get their number 
    const dispatch = useDispatch<AppDispatch>();
    const { patients , loading } = useSelector((state: RootState) => state.adminPatients);
    const {transactions,loadingFinincial } = useSelector((state: RootState) => state.transations);
    const numberOfPatients = patients?.length;
  // fetch doctors
    const {doctors , loadingDoctors } = useSelector((state : RootState)=>state.doctors);
    const numberOfDoctors =doctors.length;
  // fetch sum of sessions 
    const [numOfSession,setNumOfSessions] = useState<Session[]>();
    const fetchSession = ()=>{
      axios.get('http://127.0.0.1:8000/api/admin/sessions/all',{
        headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
        }
      })
      .then((res)=>{
        setNumOfSessions(res.data.data);
      })
      .catch((err)=>{
        console.log(err)
      });
    }


    //this week sessions
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = الأحد, 1 = الاثنين, ..., 6 = السبت

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const sessionsThisWeek = numOfSession?.filter((s) => {
      const sessionDate = new Date(s.scheduled_at.replace(" ", "T"));
      return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
    });
    console.log('sessions this week',sessionsThisWeek)
    const numOfSessionThisWeek = sessionsThisWeek?.length;

    const todayString = today.toISOString().split('T')[0]; // "2025-09-04"

    const todaysAppointment_arr = numOfSession?.filter((date) => {
      return date.scheduled_at.startsWith(todayString);
    });    

    const todayResvs = todaysAppointment_arr &&  todaysAppointment_arr?.length > 0 ? todaysAppointment_arr?.length : 0;


    // transactions info
    const moneyAmount = transactions.reduce(
      (acc, curr) => acc + (curr.status !== 'غير مدفوع' ? curr.amount : 0),
      0
    );


    useEffect(()=>{
      dispatch(fetchAllPateins());
      dispatch(fetchDoctors());
      fetchSession();
      dispatch(fetchTransactions());
    },[])
  return (
    <div className="adm-page" dir="rtl">
      <header className="adm-header">
        <h1>لوحة تحكم المشرف — الصفحة الرئيسية</h1>
        <div className="adm-header-actions">
          <button className="btn btn-primary" title="تحديث بيانات المشرف" 
          onClick={()=>setShowModal(true)}>
            تحديث بياناتي
          </button>
        </div>
      </header>

      <main className="adm-main">
        {/* الشريط الجانبي الضيق: قائمة الأطباء */}
        <aside className="adm-sidebar">
          <div className="sidebar-title">الأطباء</div>
          <ul className="doctor-list">
            {loadingDoctors ? 
            <p>جار جلب الاطباء......</p>
              : 
            doctors.map((doc) => {
              const name = `${doc.first_name ?? ""} ${doc.last_name ?? ""}`.trim();
              return (
                <li key={doc.id} className="doctor-item">
                  <img
                    src={`${image_base}/${doc.avatar}`}
                    alt={name}
                    className="doctor-avatar"
                  />
                  <div className="doctor-info">
                    <div className="doctor-name">{name || "طبيب"}</div>
                    <div className="doctor-spec">{doc.specialization ?? "-"}</div>
                  </div>
                </li>
              );
            })
          }

          </ul>

          <nav className="admin-links">
            <Link to="manage-doctors" className="link-item">
              إدارة الأطباء
            </Link>
            <Link to="usersInfo" className="link-item">
              معلومات المستخدمين
            </Link>
            <Link to="moneyManage" className="link-item">
              المعاملات المالية
            </Link>
          </nav>
        </aside>

        {/* المحتوى الرئيسي */}
        <section className="adm-content">
          {/* إحصائيات سريعة */}
          <section className="stats-grid">
            <StatCard title="إجمالي الأطباء" value={`${loading ? '...' : numberOfDoctors}`} />
            <StatCard title="إجمالي المرضى" value={`${loading ? '...' : numberOfPatients}`} />
            <StatCard title="إجمالي الجلسات" value={numOfSession ? numOfSession.length : '...'} />
            <StatCard title="جلسات هذا الأسبوع" value={numOfSessionThisWeek ? numOfSessionThisWeek : "0"} subtitle="آخر 7 أيام" />
            <StatCard title="حجوزات اليوم" value={todayResvs && todayResvs > 0 ? todayResvs : 'X'} subtitle="اليوم" />
            <StatCard title="كمية الاموال المدفوعة" value={loadingFinincial ? '...' : moneyAmount} subtitle="$" />
          </section>

          {/* قسم الجدول (recent appointments) */}
          <section className="card recent-appts">
            <h2 className="card-title">
              الجلسات لهذا الأسبوع
            </h2>
            <div className="table-wrap">
              <table className="appts-table">
                <thead>
                  <tr>
                    <th>المريض</th>
                    <th>الطبيب</th>
                    <th>التاريخ</th>
                    <th>الوقت</th>
                    <th>هاتف الطبيب</th>
                    <th>الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionsThisWeek?.map((a) => {
                    const patientName = `${a.patint?.first_name ?? "مريض"} ${a.patint?.last_name ?? ""}`.trim();
                    const doctorName = `${a.doctor.first_name ?? ""} ${a.doctor.last_name ?? ""}`.trim();
                    return (
                      <tr key={a.id}>
                        <td>{patientName}</td>
                        <td>{doctorName}</td>
                        <td>{a.scheduled_at.slice(0 , a.scheduled_at.indexOf(" "))}</td>
                        <td>{formatTime(a.scheduled_at)}</td>
                        <td>{a.doctor.phone_number ?? "-"}</td>
                        <td className={`status ${a.status}`}>{a.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </section>
        {
          showModal &&
          <EditAdminModal isOpen={showModal} onClose={onClose}/>   
        }
      </main>
    </div>
  );
};

export default AdminDashMainPage;
