import { Outlet } from "react-router-dom"
import TopNav from "../../../components/DashboardsComponents/TopNav/TopNav"
import '../DashboardsGlobalStyles.css'
import { useState } from "react";
import type { Notification } from "../../../data/generalTypes";
import NotificationsDrawer from "../../../components/DashboardsComponents/NotificationsDrawer/NotificationsDrawer";

// Redux imports 👇
import { store } from "../../../redux/store";
import { Provider } from "react-redux";

const DoctorDashTopNav = () => {
  const [drawerOpend, setDrawerOpened] = useState<boolean>(false);
  const [notifcations, setNotifications] = useState<Notification[]>([]);

  return (
    <Provider store={store}>
      <div className="DashContentWrapper">
        <TopNav
          setNotifications={setNotifications}
          setDrawerOpened={setDrawerOpened}
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
    </Provider>
  )
}

export default DoctorDashTopNav
