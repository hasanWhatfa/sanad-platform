import { Outlet } from "react-router-dom"
import TopNav from "../../../components/DashboardsComponents/TopNav/TopNav"
import '../DashboardsGlobalStyles.css'
import { useState } from "react";
import type { Notification } from "../../../data/generalTypes";
import NotificationsDrawer from "../../../components/DashboardsComponents/NotificationsDrawer/NotificationsDrawer";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

const AdminDashTopNav = () => {
    const [drawerOpend,setDrawerOpened] = useState<boolean>(false);

  const [notifcations,setNotifications] = useState<Notification[]>([]);

  const[notifcationsFetchErr,setNotificationFetchErr] = useState<string>();
  return (
    <Provider store={store}>
    <div className="DashContentWrapper">
      <TopNav 
      setNotifications={setNotifications} 
      setDrawerOpened={setDrawerOpened}
      setNotificationFetchErr={setNotificationFetchErr}
      notifcations={notifcations}
      />      
      <div className="content_wrapper">
      <NotificationsDrawer 
        notifcations={notifcations} 
        setNotifications={setNotifications} 
        drawerOpend={drawerOpend} 
        setDrawerOpened={setDrawerOpened}    
      />
        <Outlet />
      </div>
    </div>
    </Provider>
  )
}

export default AdminDashTopNav
