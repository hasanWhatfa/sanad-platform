import { Outlet } from "react-router-dom"
import SideBar from "../../../components/DashboardsComponents/SideBar/SideBar"
import type { linkObject } from "../DoctorDashboard/DoctorDashborad"
import '../DashboardsGlobalStyles.css'
import { BiMoneyWithdraw } from "react-icons/bi"
import { PiUserSquare } from "react-icons/pi"
import { FaUserDoctor } from "react-icons/fa6"
import { SlGraph } from "react-icons/sl"


const AdminDashboard = () => {
  const doctorPages : linkObject[] = [
    {
      linkTo:'',
      linkText:'احصائيات المنصة',
      icon:<SlGraph />
    },
    {
      linkTo:'moneyManage',
      linkText:'المناقلات المالية',
      icon:<BiMoneyWithdraw />
    },
    {
      linkTo:'usersInfo',
      linkText:'معلومات المستخدمين',
      icon:<PiUserSquare />
    },
    {
      linkTo:'manage-doctors',
      linkText:'اْدارة الاطباء',
      icon:<FaUserDoctor />
    }

  ]
  return (
    <div className="dashboard_Root">
      <Outlet />
      <SideBar  links={doctorPages}/>
      </div>
  )
}

export default AdminDashboard
