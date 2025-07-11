import type { ReactNode } from 'react';
import './YourWayCard.css'
import SlideIn from '../../layouts/SlideIn';
interface YourWayCardProps{
    img:ReactNode;
    heading:string;
    talk:string;
}

const YourWayCard = ({img,heading,talk} : YourWayCardProps) => {
  return (
    <SlideIn direction='left' duration={0.6} delay={0.3}>
      <div className='YourWayCard'>
        <div className="yourWayIconCotainer">
          {img}
        </div>
        <div className="youWayCardText">
          <h4>{heading}</h4>
          <p>{talk}</p>
        </div>
      </div>
    </SlideIn>
  )
}

export default YourWayCard
