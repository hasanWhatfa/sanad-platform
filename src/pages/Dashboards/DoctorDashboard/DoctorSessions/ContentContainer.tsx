import { useRef, useState} from "react";
import { image_base, type Session } from "../../../../data/generalTypes";
import axios from "axios";
import './DoctorSessions.css'
import { time } from "framer-motion";
type ContentContainerProps = {
    title:string;
    arrayOfData: Session[];
    displayedContent:string;
    handleSessionsUpdated: ()=>void;
}
interface FrontErrors{
    date_input:string;
    time_input:string
}


const ContentContainer = ({title,arrayOfData,displayedContent,handleSessionsUpdated} : ContentContainerProps) => {

// -----------------------------------------------------------------------------------------------

    const [loading,setLoading] = useState<boolean>(false)
    const [err,setErr] = useState<string>('')
    const [doneMessage,setDoneMessage] = useState<string>('');
    const [showEditForm,setShowEditForm] = useState<boolean>(false)
    const [clickedSession,setClickedSession] = useState<number>();
    const [erros,setErrors] = useState<FrontErrors>({date_input:'',time_input:''})
// -----------------------------------------------------------------------------------------------

    const handleAcceptSession = (id:number)=>{
        setLoading(true);
        const base_url : string = `http://127.0.0.1:8000/api/doctor/sessions/${id}/accept`;
        axios.post(base_url,{},{
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            setDoneMessage(res.data.message);
            handleSessionsUpdated();
        })
        .catch((err)=>{
            setErr(err.response.data.message)
        })
        .finally(()=>{
            setLoading(false)
            setTimeout(()=>{setDoneMessage('');setErr('')} , 1500)
        })
    }
    
// -----------------------------------------------------------------------------------------------
    const handleRejectSession = (id:number)=>{
        setLoading(true);

        const base_url:string = `http://127.0.0.1:8000/api/doctor/sessions/${id}/decline`
        axios.post(base_url,{},{
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            setDoneMessage(res.data.message);
            handleSessionsUpdated();
        })
        .catch((err)=>{
            setErr(err.response.data.message)
        })
        .finally(()=>{
            setLoading(false);
            setTimeout(()=>{setDoneMessage('');setErr('')} , 1500)
        })
    }

    // -----------------------------------------------------------------------------------------------
    const date_input = useRef<HTMLInputElement>(null);
    const time_input = useRef<HTMLInputElement>(null);

    const handleEditDate = (id :number)=>{
        setShowEditForm(true);
        setClickedSession(id);
    }

        const sendEditReq = ()=>{
        if(!date_input.current?.value)
            {
                setErrors({...erros , date_input:'يجب ادخال تاريخ الجلسة الجديد'});
                return
            }
        if(!time_input.current?.value)
            {
                setErrors({...erros , time_input:'يجب ادخال موعد الجلسة الجديد'})
                return   
            }
        const base_url :string = `http://127.0.0.1:8000/api/doctor/sessions/${clickedSession}/modify`
        console.log(base_url)
            axios.post(base_url,{
                new_date :`${date_input.current?.value} ${time_input.current.value}`
            },{
                headers:{
                    Accept:"application/json",
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res)=>{
                setDoneMessage(res.data.message);
                handleSessionsUpdated();
                setShowEditForm(false)
            })
            .catch((err)=>setErr(err.response.data.message))
            .finally(()=>{
                setLoading(false);
                setTimeout(()=>{setDoneMessage('');setErr('')} , 1500);
                if(date_input.current?.value){
                date_input.current.value = '';
                }
                if(time_input.current?.value){
                time_input.current.value = '' ;
                }
            })
        }

  return (
    <div className="ContentContainer">
        <div className={`editForm_cotnaiener ${showEditForm ? 'showForm' : ''}`} onClick={()=>setShowEditForm(false)}>
            <div className="content" onClick={(e)=>e.stopPropagation()}>
                <div className="inputContainer">
                    <div>
                        <label>التاريخ :</label>
                        <input type="date" placeholder="اختر تاريخا جديدا" ref={date_input}/>
                    </div>
                    {
                        erros.date_input && <p>{erros.date_input}</p>
                    }
                </div>
                <div className="inputContainer">
                    <div>
                        <label>الوقت:</label>
                        <input type="time" placeholder="اختر الوقت الجديد" ref={time_input}/>
                    </div>
                    {erros.time_input && <p>{erros.time_input}</p>}
                </div>
                <button type="submit" onClick={sendEditReq}>
                    تغيير الموعد
                </button>
            </div>
        </div>
      <h2 className="happy_font title">{title}</h2>
      {
        doneMessage || err ? 
        <p className="user_message">{doneMessage || err}</p>
        :<></>
      }
      {arrayOfData.length > 0 ? 
      <table border={1} className="doctor_table">
        <thead>
            <th>id</th>
            <th>اسم المريض</th>
            <th>الجنس</th>
            <th>العمر</th>
            <th>تاريخ</th>
            <th>ساعة</th>
            <th>افعال</th>
        </thead>
        <tbody >
            {arrayOfData.map((ses)=>{
                return(
                <tr key={ses.id}>
                    <td>
                        {ses.id}</td>
                    <td>
                        {ses.patint.first_name + ' ' + ses.patint.last_name} 
                        <img src={`${image_base}/${ses.patint.avatar}`} />
                    </td>

                    <td>{ses.patint.gender}</td>

                    <td>{ses.patint.age}</td>

                    <td>
                        {ses.scheduled_at.slice(0,ses.scheduled_at.indexOf(' '))}
                    </td>
                    <td>
                        {ses.scheduled_at.slice(ses.scheduled_at.indexOf(' '))}
                    </td>
                    {
                    displayedContent == 'requests' && 
                    <td>
                        <button onClick={()=>handleAcceptSession(ses.id)} className="accept_sessions">قبول</button>
                        <button onClick={()=>handleRejectSession(ses.id)} className="decline_sessions">رفض</button>
                    </td>
                    }
                    {
                    displayedContent == 'current' && 
                    <td>
                        <button onClick={()=>handleEditDate(ses.id)} className="edit_session">تعديل الموعد</button>
                    </td>
                    }
                </tr>
                )
            })}
        </tbody>
      </table>
        :
        <table>
            <tr>
                <p className="noSessionsMessage">لا يوجد جلسات عندك</p>
            </tr>
        </table>

      }

    </div>
  )
}

export default ContentContainer
