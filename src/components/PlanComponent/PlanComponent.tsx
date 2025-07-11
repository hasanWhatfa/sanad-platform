import type { ReactNode } from 'react';
import { IoCheckmarkDone } from "react-icons/io5";
import { HiOutlineXMark } from "react-icons/hi2";
import './PlanComponent.css'
import CTAbtn from '../CTAbtn/CTAbtn';
interface planProps{
    planData:{
        name:string;
        price:number;
        featuers:Array<{featName:string,available:boolean}>;
        paymentMethod:string;
        planIcon:ReactNode;
    }
}
const PlanComponent = ({planData} : planProps) => {
  return (
    <div className='plan'>
        <div className="planName">
            <h4>{planData.name}</h4>
            {planData.planIcon}
        </div>
        <div className="priceInfo">
            <h3 className="planPrice">
                {planData.price} $
            </h3>
            <h5>{planData.paymentMethod}</h5>
        </div>
        <ul className="planFeatuers">
            {planData.featuers.map((feat,featIndex)=>{
                return(
                    <li className='featLi' key={featIndex}>{feat.featName}{feat.available ? <IoCheckmarkDone />:<HiOutlineXMark />}</li>
                )
            })}
        </ul>
        <CTAbtn text='ابدأ رحلتك الاّن' />
    </div>
  )
}

export default PlanComponent
