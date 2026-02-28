import { useRef, useState } from "react";
import { type DoctorMainType, type User } from "../../../../data/generalTypes";
import './PatientSessions.css';
import axios from "axios";
import SlideIn from "../../../../layouts/SlideIn";
import { BounceLoader } from "react-spinners";
import { plansData } from "../../../../data/plansData";

interface AddSessionModalProps {
    doctorsList: DoctorMainType[] | undefined,
    showModal: boolean,
    fetchDoctorsErro: string | undefined,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    // Callback to execute after a session is booked successfully
    onSessionBooked: () => void;
    errorMessage:string;
}

const AddSessionModal = ({ doctorsList, showModal, fetchDoctorsErro, setShowModal, onSessionBooked,errorMessage }: AddSessionModalProps) => {

    const [dateError, setDateError] = useState<string>();
    const [gettingFreeTimes, setGettingFreeTimes] = useState<boolean>(false);
    const [freeTimes, setFreeTimes] = useState<Array<string>>();
    const [showTimeSelect, setShowTimeSelect] = useState<boolean>(false);
    const [showSubmitBtn, setShowSubmitBtn] = useState<boolean>(false);
    const [selectedTimeError, setSelectTimeError] = useState<string>()
    const [appointmentMessage, setAppointmentMessage] = useState<string>();
    const [appointmentErro, setAppointmentErro] = useState<string>()
    const doctor_id = useRef<HTMLSelectElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const time = useRef<HTMLSelectElement>(null);

    const checkIfDone = () => {
        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date.current!.value);

        if (doctor_id.current?.value &&
            doctor_id.current.value !== "defaultOption" &&
            date.current?.value) {
            if (selectedDate < todayDate) {
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

    const getFreeTimes = () => {
        const base_url: string = `http://127.0.0.1:8000/api/doctor/${doctor_id.current?.value}/free`;
        axios.post(base_url, { date: date.current?.value }, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        ).then((res) => {
            setFreeTimes(res.data.available_slots);
            setGettingFreeTimes(false);
            setShowTimeSelect(true);
            setShowSubmitBtn(true);
        }
        )
            .catch((err) => {
                console.log(err);
                setGettingFreeTimes(false);
            });
    }

    const addSession = () => {
        const base_url: string = 'http://127.0.0.1:8000/api/patient/reserve';

        if (time.current?.value && time.current?.value !== 'defaultOption') {
            setSelectTimeError('');
            
            // --- NEW LOGIC TO GET DYNAMIC DATA ---
            const user_data_raw = localStorage.getItem('user_data');
            const user_data = user_data_raw ? JSON.parse(user_data_raw) as User : null;
            const user_id = user_data?.id;

            if (!user_id) {
                setAppointmentErro("Could not find user ID. Please log in again.");
                return;
            }
            
            // 1. Get card number from localStorage
            const cardKey = `user_card_${user_id}`;
            const cardNumber = localStorage.getItem(cardKey);

            if (!cardNumber) {
                setAppointmentErro("Could not find payment card. Please subscribe to a plan again.");
                return;
            }

            // 2. Calculate amount from plan details
            const planKey = `user_plan_${user_id}`;
            const planDataString = localStorage.getItem(planKey);
            
            if(!planDataString){
                setAppointmentErro("Could not find plan data. Please subscribe to a plan.");
                return;
            }

            const planData = JSON.parse(planDataString);
            const currentPlan = plansData.find(p => p.name === planData.planName);
            
            if(!currentPlan){
                setAppointmentErro("Could not match your plan. Please contact support.");
                return;
            }

            // Parse price string like "30 $ / month" to get the number
            const price = currentPlan.price;
            const amount = price && planData.sessionsPerWeek ? (price / planData.sessionsPerWeek) : 0;
            
            const choosed_time: string = date.current?.value + ' ' + time.current?.value;

            const data = {
                doctor_id: doctor_id.current?.value,
                scheduled_at: choosed_time,
                card_num: cardNumber, 
                amount: Math.ceil(amount)
            }

            axios.post(base_url, data, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(
                (res) => {
                    setAppointmentMessage(res.data.message);
                    
                    // --- NEW: UPDATE SESSIONS_USED COUNT ---
                    const currentPlanData = JSON.parse(localStorage.getItem(planKey) || '{}');
                    currentPlanData.sessionsUsed = (currentPlanData.sessionsUsed || 0) + 1;
                    localStorage.setItem(planKey, JSON.stringify(currentPlanData));

                    // --- NEW: REFRESH SESSION LIST ---
                    onSessionBooked();
                    resetForm();
                }
            ).catch(
                (err) => {
                    setAppointmentErro(err.response.data.message);
                    console.log(err);
                    resetForm();
                }
            )
        }
        else {
            setSelectTimeError('يجب ان تختار وقتا معينا لجلستك!');
        }
    }

    const resetForm = () => {
        setTimeout(() => {
            if (doctor_id.current?.value) {
                doctor_id.current.value = 'defaultOption';
            }
            if (date.current?.value) {
                date.current.value = '';
            }
            if (time.current?.value) {
                time.current.value = 'defaultOption'
            }
            setShowTimeSelect(false)
            setShowSubmitBtn(false)
            setShowModal(false)
            setAppointmentMessage('');
            setAppointmentErro('');
        }
        , 1500)
    }

    return (
        <div className={`add-session-modal ${showModal ? 'showM' : ''}`} onClick={() => setShowModal(false)}>
            <div className={`modal_content ${showModal ? 'showMC' : ''}`} onClick={(e) => e.stopPropagation()}>
                <h1 className="happy_font" >اضافة جلسة جديدة</h1>
                {fetchDoctorsErro && <p className="apiErrorMessage">{fetchDoctorsErro}</p>}
                {appointmentMessage && <p className="doneMessage">{appointmentMessage}</p>}
                {appointmentErro && <p className="appointmentErro">{appointmentErro}</p>}
                {errorMessage &&<p className="appointmentErro">{errorMessage}</p> }
                {gettingFreeTimes && <div className="loader_container"> <BounceLoader color="#1D3557" loading={gettingFreeTimes} size={90} speedMultiplier={1} /> <p>جاري التحميل...</p> </div>}
                <div className="inputs_container">
                    <div className="doctor_input">
                        <label htmlFor="doctor">اختر الطبيب :</label>
                        <select className="" name="doctor" id="doctor" onChange={checkIfDone} ref={doctor_id}>
                            <option value="defaultOption">اختر الطبيب الذي تريدة</option>
                            {doctorsList?.map((doc) => {
                                return (
                                    <option value={doc.id} key={doc.id}>
                                        {doc.first_name} {` `} {doc.last_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="date_input">
                        <label >اختر تاريخ الجلسة : </label>
                        <input type="date" onChange={checkIfDone} ref={date} />
                        {dateError && <p className="errorMessage">{dateError}</p>}
                    </div>
                    <SlideIn direction="left">
                        {
                            showTimeSelect &&
                            <div className={`time_select ${showTimeSelect ? 'showM' : ''}`}>

                                {showTimeSelect && (
                                    freeTimes && freeTimes.length > 0 ? (
                                        <div>
                                            <label >اختر الوقت المناسب لك: </label>
                                            <select name="time" ref={time}>
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
                                {selectedTimeError && <p className="errorMessage">{selectedTimeError}</p>}
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

export default AddSessionModal;
