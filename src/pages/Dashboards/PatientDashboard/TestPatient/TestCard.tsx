import { useEffect, useState } from 'react';
import {type  TestCardProps } from '../../../../data/testCardsData';
import { FaPlay, FaChartLine } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TestCard = ({title,description,name_id,id}:TestCardProps) => {

    const [testRes,setTestRes] = useState<string>('');
    const [noTests,setNoTest] = useState<string>('');
    const [loading , setLoading] = useState<boolean>(false);

    const fetchPatientRes = (id:number)=>{
        setLoading(true)
        const baseUrl : string = `http://127.0.0.1:8000/api/patient/tests/${id}/show`
        console.log(`${name_id} test url: `,baseUrl);
        console.log(`type of the url : ${typeof baseUrl}`)
        console.log(`----------${name_id}------------------`)
        axios.get(baseUrl,{
        headers:{
                Accept:'application/json',
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then((res)=>{
            setTestRes(res.data.data.message)
            console.log('````---`-`--`-`-`-`--`-`-`-`-``--`-`-`-`-`-`-`-`-`-````````````````----------------_____________________________________________________________________________________________________----')
            console.log(res)
        })
        .catch((err)=>{
            if(err.response.data.message)            
            setNoTest("لم تقم بالاختبار سابقا")
            console.log(`for (${name_id}), you didn't take the test before`)
            console.log(err)
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    const nagivate = useNavigate()


    const goToQuesPage = ()=>{
        nagivate(`/questionsPage/${name_id}`)
    }

    const handleShowDetails = ()=>{
        console.log('hello')
    }

    useEffect(()=>{
    fetchPatientRes(id)
    },[])
  return (
    <div className="test-card">
    <div className="card-header">
        <h2>{title}</h2>
    </div>
    <p className="description">{description}</p>
    <div className="last-result">
        <FaChartLine /> <span>آخر نتيجة:
            {loading ? "جاري التحميل...." : noTests ? noTests : testRes}
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
  )
}

export default TestCard
