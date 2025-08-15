import axios from 'axios';
import type { Notification } from '../../../data/generalTypes';
import './TopNav.css'
import { IoMdNotificationsOutline } from "react-icons/io"
import { useEffect, useState } from 'react';

interface TopNavProps{
  setNotifications:React.Dispatch<React.SetStateAction<Notification[]>>;

  setDrawerOpened:React.Dispatch<React.SetStateAction<boolean>>;

  setNotificationFetchErr:React.Dispatch<React.SetStateAction<string | undefined>>;
  notifcations:Notification[];
}


const TopNav = ({setNotifications,setDrawerOpened,setNotificationFetchErr,notifcations}:TopNavProps) => {

  // must be more complecated , but ok for now
  const [hasNofi,setHasNotif] = useState<boolean>(false);
  const handleNotificationBtnClicked = ()=>{
    setDrawerOpened((prev)=>!prev);
    const base_url : string = 'http://127.0.0.1:8000/api/notifications';

    // fix logic here
    axios.get(base_url,{
      headers:{
        Accept:"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res)=>{
      setNotifications(res.data);
    })
    .catch((err)=>setNotificationFetchErr(err.message))
  }
  useEffect(()=>{
    notifcations.length > 0 ? setHasNotif(true) : setHasNotif(false);
  },[notifcations])
  return (
    <div className='TopNavDashboards'>
        <div className="logo_container">
            <img src="/public/icons/logo3.png" alt="sanad-logo" />
        </div>
      <button className="icon_container" onClick={handleNotificationBtnClicked}>
        <IoMdNotificationsOutline />
          {
            hasNofi &&
            <div className="thereIsNotifs"></div>
          }
      </button>
    </div>
  )
}

export default TopNav
