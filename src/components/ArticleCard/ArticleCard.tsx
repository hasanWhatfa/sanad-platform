import { useNavigate } from "react-router-dom"
import './ArticleCard.css'
import { IoIosArrowRoundBack } from "react-icons/io";
interface ArticleCardProps{
    desName:string;
    desImage:string;
    desTalk:string;
    categ:Array<string>;
    id:string;
}

const ArticleCard = ({desName,desImage,desTalk,categ,id} : ArticleCardProps) => {
    const navigate = useNavigate();
  return (
    <div className='ArticleCard'>
        <div className="imgContainer">
            <img src={desImage} alt={desTalk} />
        </div>
        <div className="articleCardTop">
            <div className="articeCardText">
                <div className="ArticleCardTitle">
                    <h2>{desName}</h2>
                    <div className="svgContainer" onClick={()=> navigate(`/article/${id}`)}>
                        <IoIosArrowRoundBack />
                    </div>
                </div>
                <p className="ArticleCardDescription">
                    {desTalk}
                </p>
            </div>
            <div className="articeCategory">
                {categ.map((cat,catIndex)=>{
                    return(
                        <p key={catIndex}>{cat}</p>
                    )
                })}
            </div>
        </div>

    </div>
  )
}

export default ArticleCard
