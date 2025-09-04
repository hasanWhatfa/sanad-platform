import { Outlet } from "react-router-dom"
import SideBar from "../../../components/DashboardsComponents/SideBar/SideBar"
import type { ReactNode } from "react";
import { IoIosHome, IoIosListBox } from "react-icons/io";
import { FaNewspaper, FaUserDoctor } from "react-icons/fa6";

export interface linkObject{
  linkText:string;
  linkTo:string;
  icon:ReactNode;
}
const DoctorDashborad = () => {
  const doctorPages: linkObject[] =[
    {
      linkText:"الرئيسية",
      linkTo:'',
      icon:<IoIosHome />
    },
    {
      linkText:'المرضى',
      linkTo:'doctor-patients',
      icon:<FaUserDoctor />
    },
    {
      linkText:'الحلسات',
      linkTo:'doctor-sessions',
      icon:<IoIosListBox />
    },
    {
      linkText:'المقالات',
      linkTo:'doctor-blogs',
      icon:<FaNewspaper />
    }
  ]

  return (
    <div className="dashboard_Root">
    <Outlet />
    <SideBar  links={doctorPages}/>
    </div>
  )
}

export default DoctorDashborad
