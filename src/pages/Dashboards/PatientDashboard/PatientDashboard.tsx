import { Outlet } from "react-router-dom";
import SideBar from "../../../components/DashboardsComponents/SideBar/SideBar"
import '../DashboardsGlobalStyles.css'
import type { ReactNode } from "react";
import { IoIosHome } from "react-icons/io";
import { IoIosListBox } from "react-icons/io";
import { BsBookmarkStarFill } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";
import { FaUserCog } from "react-icons/fa";
const PatientDashboard = () => {
  const patientDashboardLinks: Array<{linkText:string;linkTo:string;icon:ReactNode}> =[
    {
      linkText:"الرئيسية",
      linkTo:'',
      icon:<IoIosHome />
    },
    {
      linkText:'جلساتي',
      linkTo:'my-sessions',
      icon:<IoIosListBox />
    },
    {
      linkText:'الاختبارات',
      linkTo:'patient-tests',
      icon:<LuClipboardList />
    },
    {
      linkText:'تقييم الاطباء',
      linkTo:'patient-rate',
      icon:<BsBookmarkStarFill />
    },
    {
      linkText:'ادارة معلوماتي',
      linkTo:"edit-patient-data",
      icon:<FaUserCog />
    }
  ]
  return (
    <main className="dashboard_Root">
        <Outlet />
       <SideBar links={patientDashboardLinks}/>
    </main>
  )
}

export default PatientDashboard
