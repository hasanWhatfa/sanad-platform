import TitleComponent from '../TitleComponent/TitleComponent'
import WhySanadCard from '../WhySanadCard/WhySanadCard'
import { whySanadData } from '../../data/whySanadData'
import sliceArray from '../SliceArr'
import './WhySanad.css'
import CTAbtn from '../CTAbtn/CTAbtn'
const WhySanad = () => {
    let row = sliceArray(whySanadData,3)
  return (
    <section className="whySanadSection px-162">
      <TitleComponent title='لماذا سند؟' desc='لأنك تستحق ان تكون سعيدا'/>
      <div className="whySanadMainContai">
        <div className="wscardsContainer">
            {
                row.map((row,rowIndex)=>{
                    return(
                        <div className='whyUSRow' key={rowIndex}>
                            {
                                row.map((card,cardIndex)=>{
                                    return(
                                        <WhySanadCard cardData={card}key={cardIndex}/>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
        <CTAbtn text='احجز جلستك الاّن'/>
      </div>
    </section>
  )
}

export default WhySanad
