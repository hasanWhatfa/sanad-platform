import { useEffect, useState } from 'react';
import {type  TestCardProps } from '../../../../data/testCardsData';
import { FaPlay, FaChartLine } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';


export type answerShape = {
    quest:string;
    answer:string;
}


// the interface for the recieved data.
export interface TestResult {
    patient_id:string;
    result:string;
    test_name:string;
    result_description:string;
    answers:Array<Record<string,string>>;
    created_at:string;
    updated_at:string;
}



const TestCard = ({title,description,name_id,id}:TestCardProps) => {
    const [isModalOpen , setIsModalOpen] = useState<boolean>(false);
    const [testRes,setTestRes] = useState<TestResult>();
    const [noTests,setNoTest] = useState<string>('');
    const [loading , setLoading] = useState<boolean>(false);

    const fetchPatientRes = (id:number)=>{
        setLoading(true)

        const baseUrl : string = `http://127.0.0.1:8000/api/patient/tests/${id}/show`

        axios.get(baseUrl,{
        headers:{
                Accept:'application/json',
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            setTestRes(res.data);
        })
        .catch((err)=>{
            setNoTest(err.response.data.message);
            console.log(err.response);
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    const nagivate = useNavigate();


    const goToQuesPage = ()=>{
        nagivate(`/questionsPage/${name_id}`)
    }

    const handleShowDetails = ()=>{
        setIsModalOpen(true);
    }

    useEffect(()=>{
    fetchPatientRes(id)
    },[])
  return (
    <> 
        <div className="test-card">
            <div className="card-header">
                <h2>{title}</h2>
            </div>
            <p className="description">{description}</p>
            <div className="last-result">
                <FaChartLine /> <span>آخر نتيجة:
                    {loading ? "جاري التحميل...." : noTests ? noTests : testRes?.result_description}
                </span>
                {
                    testRes && 
                    <button className="details-btn" onClick={handleShowDetails}>عرض التفاصيل</button>
                }
            </div>
            <button onClick={goToQuesPage} className="start-btn" >
                <FaPlay /> بدء الاختبار
            </button>
        </div>
        <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            data={testRes ?? null} 
            onRetake={goToQuesPage}
        />
    </>
  )
}

export default TestCard
