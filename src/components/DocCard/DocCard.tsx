import './DocCard.css'

interface DocCardProps{
  docName:string;
  docImage:string;
  docDesc:string;
  docID:number;
  choosenDoc?:boolean
}

const DocCard = ({docName,docImage,docDesc,docID , choosenDoc} : DocCardProps) => {
  return (
    <div className={`DocCardComponent ${choosenDoc ? 'DocCardActive' : ''}`}>
      <div className="topPART">
        <div className="docCardImage">
          <img src={docImage} alt="" />
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
