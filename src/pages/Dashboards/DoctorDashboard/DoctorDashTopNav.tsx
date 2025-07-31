import { Outlet } from "react-router-dom"
import TopNav from "../../../components/DashboardsComponents/TopNav/TopNav"
import '../DashboardsGlobalStyles.css'
import { useState } from "react";
import type { Notification } from "../../../data/generalTypes";
import NotificationsDrawer from "../../../components/DashboardsComponents/NotificationsDrawer/NotificationsDrawer";
const DoctorDashTopNav = () => {
  
  const [drawerOpend,setDrawerOpened] = useState<boolean>(false);

  const [notifcations,setNotifications] = useState<Notification[]>([]);

  const[notifcationsFetchErr,setNotificationFetchErr] = useState<string>();

  return (
    <div className="DashContentWrapper">
      <TopNav 
      setNotifications={setNotifications} 
      setDrawerOpened={setDrawerOpened}
      setNotificationFetchErr={setNotificationFetchErr}
      notifcations={notifcations}
      />
      <div className="content_wrapper">
        <Outlet />
      <NotificationsDrawer 
        notifcations={notifcations} 
        setNotifications={setNotifications} 
        drawerOpend={drawerOpend} 
        setDrawerOpened={setDrawerOpened}    
      />
      </div>
    </div>
  )
}

export default DoctorDashTopNav
