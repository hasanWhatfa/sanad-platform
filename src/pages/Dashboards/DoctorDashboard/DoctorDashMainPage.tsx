import type { User } from '../../../data/generalTypes';
import '../DashboardsGlobalStyles.css'


const DoctorDashMainPage = () => {
    const rawData = localStorage.getItem("user_data");
    const user_data = rawData? JSON.parse(rawData) as User : null;

  return (
    <div className="doctor_main_page p60">
        <div className='welcome_phrase'>
        <p>
          اهلا وسهلا د.
         <span className='userName_span'>
            {" " + user_data?.first_name + " "} 
         </span>
        في منصة سند
        </p>
        <p className='happy_font our_name'>
        </p>
      </div>
    </div>
  )
}

export default DoctorDashMainPage
