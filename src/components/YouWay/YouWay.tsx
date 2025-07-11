import TitleComponent from '../TitleComponent/TitleComponent'
import './YouWay.css'
import { youWayData } from '../../data/youWayData'
import YourWayCard from '../YourWayCard/YourWayCard'
const YouWay = () => {
  return (
    <section className='px-162'>
        <TitleComponent title='نحن طريقك للتعافي' desc='صممنا منصة سند لتكون الحل الالكتورني للذين يعانون من ضغوط الحياة'
        />
       <div className="youWayContent">
          <div className="imgCont">
            <img src="/images/heroImage3.jpg"/>
          </div>
          <div className="youWayCardsContainer">
              {youWayData.map((e,i)=>{
                  return(
                      <YourWayCard img={e.img} heading={e.heading} talk={e.talk} key={i}/>
                  )
              })}
          </div>
       </div>
    </section>
  )
}

export default YouWay
