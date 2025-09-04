import './DoctorPatiens.css'
import { useEffect } from 'react';
import PatientCard from './PatientCard';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../../redux/store';
import { fetchPateins } from '../../../../redux/slices/PatientsSlice';


const DoctorPatiens = () => {
  // states

  const dispatch = useDispatch<AppDispatch>();
  const { patients, loading } = useSelector((state: RootState) => state.patients);


  const uniquePatients = Array.from(
    new Map(patients.map((p) => [p.id ?? p.user_id, p])).values()
  );

  useEffect(() => {
    dispatch(fetchPateins());
  }, [dispatch]);

const SkeletonPatientCard = ()=>{
  return(
     <div className="patient_card skeleton_card">
      <div className="header">
        <div className="skeleton skeleton-text name"></div>
        <div className="skeleton skeleton-circle image"></div>
      </div>
      <div className="details">
        <div className="skeleton skeleton-text line"></div>
        <div className="skeleton skeleton-text line"></div>
        <div className="skeleton skeleton-text box"></div>
        <div className="skeleton skeleton-text box"></div>
        <div className="skeleton skeleton-text button"></div>
      </div>
    </div>
  )
}

  useEffect(()=>{
    fetchPateins()
  },[]);
  return (
    <div className="doctor_patients p60">
      <header className="page_header">
        <h1 className="page_title">المرضى</h1>
        <p className="page_subtitle">هنا يمكنك إدارة بيانات المرضى ومتابعة حالتهم بكل سهولة</p>
      </header>
      
      <div className="patients_container">
      {loading
        ? Array.from({ length: 3 }).map((_, i) => (
            <SkeletonPatientCard key={i} />
          ))
        : uniquePatients.map((patient) => (
            <PatientCard key={patient?.id} patient={patient} />
          ))
      }

        {}
      </div>
    </div>
  )
}

export default DoctorPatiens
