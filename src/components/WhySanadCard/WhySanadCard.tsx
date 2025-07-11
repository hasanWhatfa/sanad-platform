import type { ReactNode } from 'react';
import './WhySanadCard.css'
interface whySanadCardDataProps{
    cardData:{
        icon:ReactNode;
        title:string;
        text:string;
    }
}
const WhySanadCard = ({cardData}:whySanadCardDataProps) => {
  return (
    <div className='whySanadCard'>
        <div className="whyUscardiconContainer">
            {cardData.icon}
        </div>
        <h3>{cardData.title}</h3>
        <p className='whySanadCardDescription'>
            {cardData.text}
        </p>
    </div>
  )
}

export default WhySanadCard
