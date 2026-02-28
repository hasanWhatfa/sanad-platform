// DoctorPatientsPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import "./DoctorPatientsPage.css";

type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
  email: string;
  phone_number: string;
  age: number;
  gender: string;
};

type Doctor = {
  id: number;
  first_name: string;
  last_name: string;
  avatar?: string;
  specialization: string;
  achievements: string;
};

type DoctorWithPatients = {
  doctor: Doctor;
  patients: Patient[];
};

export default function DoctorPatientsPage() {
  const [data, setData] = useState<DoctorWithPatients[]>([]);
  const [search, setSearch] = useState("");
  const [loadingData,setLoadingData] = useState<boolean>(false);
  useEffect(() => {
  setLoadingData(true);
    axios
      .get("http://127.0.0.1:8000/api/admin/doctors/patients",{
        headers:{
          Accept:'application/json',
          Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        setData(res.data.data || []);
      })
      .catch((err) => console.error(err))
      .finally(()=>{
        setLoadingData(false);
      });
  }, []);

  const filteredData = data.filter((item) => {
    const doctorName = `${item.doctor.first_name} ${item.doctor.last_name}`;
    const patientsNames = item.patients
      .map((p) => `${p.first_name} ${p.last_name}`)
      .join(" ");
    return (
      doctorName.includes(search) ||
      patientsNames.includes(search) ||
      item.doctor.specialization.includes(search)
    );
  });

  return (
    <div className="page-container" dir="rtl">
      <h1 className="page-title">🩺 الأطباء ومرضاهم</h1>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="ابحث عن طبيب أو مريض..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Doctors List */}
      <div className="doctors-grid">
        {loadingData ? 
        <p>Loading...</p> 
        :
        filteredData.map((item) => (
          <div key={item.doctor.id} className="doctor-card">
            {/* Doctor Info */}
            <div className="doctor-header">
              <img
                src={`http://127.0.0.1:8000/storage/${item.doctor.avatar}`}
                alt="doctor"
                className="doctor-avatar"
              />
              <div>
                <h2 className="doctor-name">
                  {item.doctor.first_name} {item.doctor.last_name}
                </h2>
                <p className="doctor-specialization">
                  {item.doctor.specialization}
                </p>
              </div>
            </div>

            {/* Patients */}
            <div>
              <h3 className="patients-title">
                المرضى ({item.patients.length})
              </h3>
              {item.patients.length === 0 ? (
                <p className="no-patients">لا يوجد مرضى بعد</p>
              ) : (
                <div className="patients-list">
                  {item.patients.map((p) => (
                    <div key={p.id} className="patient-card">
                      <img
                        src={`http://127.0.0.1:8000/storage/${p.avatar}`}
                        alt="patient"
                        className="patient-avatar"
                      />
                      <div>
                        <p className="patient-name">
                          {p.first_name} {p.last_name}
                        </p>
                        <p className="patient-email">{p.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      }

      </div>
    </div>
  );
}
