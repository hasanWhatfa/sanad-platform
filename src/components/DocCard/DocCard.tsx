import { image_base } from '../../data/generalTypes';
import './DocCard.css'



interface DocCardProps{
  docName:string | undefined;
  docImage:string | undefined;
  docDesc:string | undefined;
  docID:number | undefined;
  choosenDoc?:boolean
}



const DocCard = ({docName,docImage,docDesc,choosenDoc} : DocCardProps) => {


  return (
    <div className={`DocCardComponent ${choosenDoc ? 'DocCardActive' : ''}`}>
      <div className="topPART">
        <div className="docCardImage">
          <img src={`${image_base}/${docImage}`} />
        </div>
      </div>
      <div className="bottomPart">
        <h3 className="docCardComName">
          {docName}
        </h3>
        <p>
          {docDesc}
        </p>
      </div>
    </div>
  )
}

export default DocCard
