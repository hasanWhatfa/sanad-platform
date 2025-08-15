import { useRef, useState} from "react"
import {image_base, type DoctorMainType } from "../../../../data/generalTypes"
import './PatientSessions.css'
import axios from "axios"
import SlideIn from "../../../../layouts/SlideIn"
import { BounceLoader } from "react-spinners"
interface AddSessionModalProps{
    doctorsList:DoctorMainType[] | undefined,
    showModal:boolean,
    fetchDoctorsErro:string | undefined,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}



const AddSessionModal = ({doctorsList,showModal,fetchDoctorsErro,setShowModal}:AddSessionModalProps) => {

    const [dateError,setDateError] = useState<string>();
    const [gettingFreeTimes,setGettingFreeTimes] = useState<boolean>(false);
    const [freeTimes,setFreeTimes] = useState<Array<string>>();
    const [showTimeSelect , setShowTimeSelect] = useState<boolean>(false);
    const [showSubmitBtn,setShowSubmitBtn] = useState<boolean>(false);
    const [selectedTimeError,setSelectTimeError] = useState<string>()
    const [appointmentMessage ,setAppointmentMessage] = useState<string>();
    const [appointmentErro,setAppointmentErro] = useState<string>()
    const doctor_id = useRef<HTMLSelectElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const time = useRef<HTMLSelectElement>(null);

    const checkIfDone =()=>{
        const todayDate = new Date();
        todayDate.setHours(0,0,0,0);
        const selectedDate = new Date(date.current!.value);

        if(  doctor_id.current?.value &&
            doctor_id.current.value !== "defaultOption" &&
            date.current?.value){
            if(selectedDate < todayDate){
                setDateError('الرجاء اختيار موعد بعد تاريخ اليوم');
                return
            }
            setDateError(undefined);
            setGettingFreeTimes(true);
            setFreeTimes([]);
            setShowTimeSelect(false);
            setShowSubmitBtn(false);
            getFreeTimes();
        }
    }


    const getFreeTimes = ()=>{
        const base_url : string = `http://127.0.0.1:8000/api/doctor/${doctor_id.current?.value}/free`;
        axios.post(base_url,{date : date.current?.value},{
          headers:{
              Accept:'application/json',
              Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        }
      ).then((res)=>{
          setFreeTimes(res.data.available_slots);
          setGettingFreeTimes(false);
          setShowTimeSelect(true);
          setShowSubmitBtn(true);
          console.log(`dotor's available_slots are : ${res.data.available_slots}`)
        }
      )
      .catch((err)=>{
        console.log(err);
        setGettingFreeTimes(false);
      });
    }


    const addSession =()=>          
      {
      const base_url : string = 'http://127.0.0.1:8000/api/patient/reserve';

      if(time.current?.value && time.current?.value != 'defaultOption'){
        setSelectTimeError('');
        const choosed_time : string = date.current?.value + ' ' + time.current?.value;

        const data = {
          doctor_id:doctor_id.current?.value,
          scheduled_at : choosed_time
        }

        axios.post(base_url,data,{

          headers:{
              Accept:'application/json',
              Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(
          (res)=>{
            setAppointmentMessage(res.data.message);
            resetForm();
          }
        ).catch(
          (err)=>{
            setAppointmentErro(err.response.data.message);
            console.log(err);
            resetForm();
          }
        )
      }
      else{
        setSelectTimeError('يجب ان تختار وقتا معينا لجلستك!');
      }
      
    }


    const resetForm =()=>{
      setTimeout(()=>{
        if(doctor_id.current?.value){
          doctor_id.current.value = '';
        }
        if(date.current?.value){
          date.current.value = '' ;
        }
        if(time.current?.value){
          time.current.value = ''
        }
        setShowTimeSelect(false)
        setShowSubmitBtn(false)
        setShowModal(false)
        setAppointmentMessage('');
        setAppointmentErro('');
      }
    ,1500)
    }

  return (
      <div className={`add-session-modal ${showModal ? 'showM' : ''}`} onClick={()=>setShowModal(false)}>
        <div className={`modal_content ${showModal ? 'showMC' : ''}`} onClick={(e)=>e.stopPropagation()}>
          <h1 className="happy_font" >اضافة جلسة جديدة</h1>
          {
          fetchDoctorsErro &&
          <p className="apiErrorMessage">{fetchDoctorsErro}</p>
          }
          {
            appointmentMessage && 
            <p className="doneMessage">{appointmentMessage}</p>
          }
          {
            appointmentErro && 
            <p className="appointmentErro">{appointmentErro}</p>
          }
          {
              gettingFreeTimes && 
              <div className="loader_container">
              <BounceLoader
              color="#1D3557"
              cssOverride={{

              }}
              loading={gettingFreeTimes}
              size={90}
              speedMultiplier={1}
              /> 
              <p>جاري التحميل...</p>
              </div>      
            }
            <div className="inputs_container">
              <div className="doctor_input">
                <label htmlFor="doctor">اختر الطبيب :</label>
                <select className="" name="doctor" id="doctor" onChange={checkIfDone} ref={doctor_id}>
                  <option value="defaultOption">اختر الطبيب الذي تريدة</option>
                  {
                    doctorsList?.map((doc)=>{
                      return(
                        <option value={doc.id} key={doc.id}>
                          <div>
                            <p>{doc.first_name} {` `} {doc.last_name}</p>
                            <img src={`${image_base}/${doc.avatar}`} />
                          </div>
                        </option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="date_input">
                <label >اختر تاريخ الجلسة : </label>
                <input type="date" onChange={checkIfDone} ref={date}/>
                {
                    dateError &&
                    <p className="errorMessage">{dateError}</p>
                }
              </div>
              <SlideIn direction="left">
                {
                showTimeSelect  &&
                <div className={`time_select ${showTimeSelect ? 'showM' : ''}`}>

                    {showTimeSelect && (
                      freeTimes && freeTimes.length > 0 ? (
                        <div>
                          <label >اختر الوقت المناسب لك: </label>
                          <select name="time"  ref={time}>
                            <option value="defaultOption">اختر الوقت الذي يناسبك</option>
                            {freeTimes.map((time, timeIdx) => (
                              <option value={time} key={timeIdx}>{time}</option>
                            ))}
                          </select>
                        </div>

                      ) : (
                        <p className="noTimesAvailable">لا يوجد اوقات فارغة لدى الطبيب في هذا اليوم , الرجاء اختيار يوم اخر</p>
                      )
                    )}
                    {
                      selectedTimeError && 
                      <p className="errorMessage">{selectedTimeError}</p>
                    }
                </div>
                  
                }

              </SlideIn>
              {
                showSubmitBtn &&
                <SlideIn direction="bottom">
                  <button className={`sumbitBtn happy_font ${showSubmitBtn ? 'showM' : ''}`} onClick={addSession}>
                    تأكيد الحجز
                  </button>
              </SlideIn>
              }
            </div>
        </div>
      </div>
  )
}

export default AddSessionModal

