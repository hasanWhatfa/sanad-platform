import type { User } from '../../../data/generalTypes';
import '../DashboardsGlobalStyles.css'
import { userMainPageCardsData } from '../../../data/patientPagesData';
import ColorfulCard from '../../../components/DashboardsComponents/ColorfulCard/ColorfulCard';
import { useNavigate } from 'react-router-dom';
import sliceArray from '../../../components/SliceArr';


const PatientDashMainPage = () => {
  const rawData = localStorage.getItem("user_data");
  const user_data = rawData? JSON.parse(rawData) as User : null;
  const navigate = useNavigate()
  const data_rows = sliceArray(userMainPageCardsData,2)
  return (
    <div className='patient_main_page p60'>
      <div className='welcome_phrase'>
        <p>
         اهلا وسهلا يا 
         <span className='userName_span'>
            {" " + user_data?.first_name + " "} 
         </span>
        في منصة سند
        </p>
        <p className='happy_font our_name'>
          سندك في رحلتك نحو راحة البال
        </p>
      </div>
      <div className="cards_container">
        {
          data_rows.map((row,rowIndex)=>{
            return(
              <div className='cards_row'>
                {row.map((card,idx)=>{
                  return(
                    <ColorfulCard data={card} key={idx}/>
                  )
                })}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default PatientDashMainPage
