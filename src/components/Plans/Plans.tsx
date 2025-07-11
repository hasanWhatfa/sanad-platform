import PlanComponent from '../PlanComponent/PlanComponent'
import TitleComponent from '../TitleComponent/TitleComponent'
import './Plans.css'
import { plansData } from '../../data/plansData'
const Plans = () => {
  return (
    <section className='plansSection px-162'>
      <TitleComponent title='خطط الاشتراك' desc='اختر الخطة التي تناسبك للحصول على الدعم النفسي المتواصل مع أطباء مختصين، في أي وقت ومن أي مكان.' />
      <div className="plansContainer">
        {plansData.map((plan,planIndex)=>{
            return(
                <PlanComponent planData={plan} key={planIndex} />
            )
        })}
      </div>
    </section>
  )
}

export default Plans
