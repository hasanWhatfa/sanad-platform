import axios from "axios";
import { useEffect, useState } from "react"
import { SessionStatus, type Session } from "../../../../data/generalTypes";
import ContentContainer from "./ContentContainer";
import {ScaleLoader } from "react-spinners";
import './DoctorSessions.css'
export enum DisplayedContent {
  currentSessions = "current",
  requestedSessions = "requests"
}

const DoctorSessions = () => {
  const [displayedContent,setDisaplayedContent] = useState<string>(DisplayedContent.currentSessions);
  const [sessions,setSession] = useState<Session[]>([]);
  const [sessionsUpdated,setSessionsUpadted] = useState<boolean>(false);
  const [loadingSessions,setLoadingSessions] = useState<boolean>(false);
  const [error,setError] = useState<string>('');

  const approvedSessions = sessions.filter((ses)=>ses.status == SessionStatus.approved);
  const penedingSessions = sessions.filter((ses)=>ses.status == SessionStatus.pending);

  const handleSessionsUpdated = ()=>{
    setSessionsUpadted((prev)=>!prev);
  }
  const fetchSession = ()=>{
    const base_url : string = "http://127.0.0.1:8000/api/doctor/sessions";
    setLoadingSessions(true);
    axios.get(base_url,{
      headers:{
        Accept:'application/json',
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res)=>{
      setSession(res.data.data);
    })
    .catch((err)=>{setError(err.response.data.message)})
    .finally(()=>{
      setLoadingSessions(false)
    })
  }
  useEffect(()=>{
    fetchSession();
    console.log(approvedSessions);
    console.log(penedingSessions);
  },[sessionsUpdated]);
  return (
    <main className="DoctorSessions_page p60">
        {
          loadingSessions && 
          <div className="loader">
            <ScaleLoader
              barCount={5}
              color="#1D3557"
              height={50}
              margin={3}
              radius={2}
              width={4}
            />
          </div>
        }
      <div className="content">
        <div className="tabs_container">
          <button className={`happy_font ${displayedContent == DisplayedContent.currentSessions ? 'active' : ''}`} onClick={()=>setDisaplayedContent(DisplayedContent.currentSessions)}>الجلسات المقررة</button>
          <button className={`happy_font ${displayedContent == DisplayedContent.requestedSessions ? 'active' : ''}`} onClick={()=>setDisaplayedContent(DisplayedContent.requestedSessions)}>الطلبات</button>
        </div>

        <div className="tabel_container">
          {
            displayedContent == DisplayedContent.currentSessions ?
            (
              <ContentContainer title="الجلسات المقررة" arrayOfData={approvedSessions} displayedContent={displayedContent} handleSessionsUpdated={handleSessionsUpdated}/>
            )
            :
            (
              <ContentContainer title="الطلبات"  arrayOfData={penedingSessions} displayedContent={displayedContent} handleSessionsUpdated={handleSessionsUpdated}/>
            )
          }
        </div>
      </div>
    </main>
  )
}

export default DoctorSessions
