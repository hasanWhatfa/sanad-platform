import { useParams } from 'react-router-dom';
import './PatientDetails.css'
import { useEffect, useState } from 'react';
import { fetchPateins } from '../../../../redux/slices/PatientsSlice';
import { type RootState , type AppDispatch } from '../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import DoctorNotesSection from './DoctorNotesSection';
import { image_base } from '../../../../data/generalTypes';
import { testsData } from '../../../../data/PsychTest';
import axios from 'axios';
import {type  TestResult} from '../../../../data/generalTypes';
import TestReslutSection from './TestReslutSection';
import { BounceLoader } from 'react-spinners';


const PatientDetails = () => {

  const params = useParams();

  const patient_id = params.id;


  const dispatch = useDispatch<AppDispatch>();
  const { patients, loading } = useSelector((state: RootState) => state.patients);

  const patient = patients.find((p) => String(p.id) === patient_id);
  const testIds = testsData.map((test)=>test.test_id);

  const [conductedTests,setConductedTests] = useState<Array<TestResult>>([]);
  const [loadingTestRess,setLodaingTestRess] = useState<boolean>(false);
  const fetchUserResults = async (id: string, testIds: number[]) => {
    try {
      setLodaingTestRess(true);
      const requests = testIds.map(testId =>
        axios
          .get(`http://127.0.0.1:8000/api/doctor/patients/${id}/${testId}/show`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(res => res.data)
          .catch(err => {
            if (err.response?.data?.message === "لا توجد نتائج") {
              return null;
            }
            throw err;
          })
      );
      
      
      const results = await Promise.all(requests);
      setLodaingTestRess(false);
      setConductedTests(results.filter(r => r !== null) as TestResult[]);
    } catch (error) {
      console.error("Error fetching user results", error);
    }
  };


    useEffect(()=>{
      if(patient){
        fetchUserResults(String(patient.id),testIds)
      }
    },[])

    useEffect(() => {
    if (patients.length === 0) {
      dispatch(fetchPateins());
    }
  }, [dispatch, patients.length]);

  return (
    <div className="patient_details_page">
      {/* Header */}
      <header className="patient_header">
        <img src={loading ? '/images/heroImage2.webp' : `${image_base}/${patient?.avatar}`} alt={`${patient?.first_name} ${patient?.last_name}'s image`} className="patient_avatar" />
        <div>
          <h1 className="patient_name">{loading ? '......': `${patient?.first_name} ${patient?.last_name}`}</h1>
          <p className="patient_info">العمر: {patient?.age} | الجنس: {patient?.gender}</p>
        </div>
      </header>
      {loadingTestRess ?
      <div className="fetching_results_loader">
        <BounceLoader
          color="#1D3557"
          loading={loadingTestRess}
          size={60}
          speedMultiplier={1.5}
        />
      </div>
      :
      conductedTests.length == 0 ? 
      <div>لم يقم المريض بأي اختبارات حتى الان</div>
      :
        conductedTests.map((testRes)=>
        (<TestReslutSection key={testRes.patient_id} testResult={testRes}/>))
      }
      {/* Notes Section */}
      <DoctorNotesSection patient_id={patient_id}/>
    </div>
  );
};

export default PatientDetails;










// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../../store/store";
// import { fetchPatients } from "../../store/patientsSlice";
// import { useEffect } from "react";

// const PatientDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch<AppDispatch>();
//   const { patients, loading } = useSelector((state: RootState) => state.patients);

//   useEffect(() => {
//     if (patients.length === 0) {
//       dispatch(fetchPatients());
//     }
//   }, [dispatch, patients.length]);

//   const patient = patients.find((p) => String(p.id) === id);

//   if (loading) return <p>Loading...</p>;
//   if (!patient) return <p>المريض غير موجود</p>;

//   return (
//     <div className="patient_details_page">
//       <header className="patient_header">
//         <img src={patient.avatar} alt={patient.first_name} className="patient_avatar" />
//         <div>
//           <h1 className="patient_name">{patient.first_name} {patient.last_name}</h1>
//           <p className="patient_info">العمر: {patient.age} | الجنس: {patient.gender}</p>
//         </div>
//       </header>
//       {/* باقي الأقسام (الاختبارات + الملاحظات) تبقى مثل ما عملتها */} 
//     </div>
//   );
// };

// export default PatientDetails;
