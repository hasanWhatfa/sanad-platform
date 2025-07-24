import { Outlet } from "react-router-dom"
import TopNav from "../../../components/DashboardsComponents/TopNav/TopNav"
import '../DashboardsGlobalStyles.css'

const AdminDashTopNav = () => {
  return (
    <div className="DashContentWrapper">
      <TopNav />
      <div className="content_wrapper">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashTopNav
