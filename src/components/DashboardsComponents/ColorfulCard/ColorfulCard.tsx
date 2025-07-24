import { useNavigate } from "react-router-dom";
import type { UserMainPageCard } from "../../../data/patientPagesData"
import './ColorfulCard.css'
interface ColorfulCardProps{
    data:UserMainPageCard;
    className?:string
}
const ColorfulCard = ({data,className} : ColorfulCardProps) => {
    const navigate = useNavigate();
  return (
    <div className={`colorFulCard ${className} ${data.bgColor == 'toBlue' ? 'toBlueBG' : data.bgColor == "toGreen"
        ? 'toGreenBG' : data.bgColor == 'toOrange' ? 'toOrangeBG' : 'toPurpulrBG'
    }`} onClick={()=>navigate(data.linkTo)}>
      <p className="happy_font colorFulCardP">{data.title}</p>
      <div className="icon_container">
        {data.icon}
      </div>
    </div>
  )
}

export default ColorfulCard
