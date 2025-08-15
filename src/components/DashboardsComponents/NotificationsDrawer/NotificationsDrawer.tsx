import { FaXmark } from 'react-icons/fa6'
import './NotificationsDrawer.css'
import type { Notification } from '../../../data/generalTypes';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoRefresh} from 'react-icons/io5';

interface NotificationsDrawerProps{
    notifcations: Notification[];
    setNotifications:React.Dispatch<React.SetStateAction<Notification[]>>;
    drawerOpend:boolean;
    setDrawerOpened:React.Dispatch<React.SetStateAction<boolean>>;
}


// 
//  potenial errors to fix:
//      1-the error message
//      2-the handleDeleteNotif && handleMaskAsRead 
//      3-needs to be reviewed

const NotificationsDrawer = ({notifcations,setNotifications,drawerOpend,setDrawerOpened}:NotificationsDrawerProps) => {

    const [errors,setErrors] = useState<{
        deleteAllError:string;
        read_all_Erro:string;
        unreadAllError:string;
        maskAsReadError:string;
        deleteNotifError:string;
        notificatiosUpdateErr:string;
    }>({
        deleteAllError:'',
        deleteNotifError:'',
        maskAsReadError:'',
        read_all_Erro:'',
        unreadAllError:'',
        notificatiosUpdateErr:''
    })

    const [notificationsEdited,setNotificationsEdited] = useState<boolean>(false);
    const [doneMessage , setDoneMessage] = useState<string>('');
    const [showDoneMessage,setShowDoneMessage] = useState<boolean>(false);
    const [refreshingNotifs,setRefreshing]= useState<boolean>(false);

// ----------------------------------------------------------------
    const showDoneMessageNow = ()=>{
        setShowDoneMessage(true);
        setTimeout(()=>{
            setShowDoneMessage(false);
        },1500)
    }
    
// ----------------------------------------------------------------

    const handleMaskAsRead = (id : string) =>{
        const base_url :string = `http://127.0.0.1:8000/api/notifications/${id}/read`

        axios.post(base_url,{id : id},{
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        })
        .then((res)=>{
            // do something , relies on how the state of the notification is changed in the back-end
            setNotificationsEdited((prev)=>!prev);
            setDoneMessage(res.data.message);
            showDoneMessageNow();
        }
        )
        .catch((err)=>{
            setErrors({...errors,maskAsReadError:err.response.message})
        })
    }

// ----------------------------------------------------------------

    const handleDeleteNotif = (id : string)=>{
        const base_url : string = `http://127.0.0.1:8000/api/notifications/${id}`;

        axios.delete(base_url,{
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`,
            },
            method:"DELETE"
        }).then(
            (res)=>{
                setNotificationsEdited((prev)=>!prev)
                setDoneMessage(res.data.message);
                showDoneMessageNow()
            }
        )
        .catch((err)=>setErrors({...errors,deleteNotifError:err.response.message}))
    }

// ----------------------------------------------------------------

    const handleReadAll =()=>{
        const base_url : string = 'http://127.0.0.1:8000/api/notifications/read-all';

        axios.post(base_url,{},{
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`   
            }
            
        })
        .then((res)=>{setNotificationsEdited((prev)=>!prev);setDoneMessage(res.data.message);showDoneMessageNow()})
        .catch((err)=>setErrors({...errors,read_all_Erro:err.response.message}));
    }

// ----------------------------------------------------------------
    const handleDeleteAll = ()=>{
        const base_url:string = 'http://127.0.0.1:8000/api/notifications';
        axios.delete(base_url, {
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`   
            }
        })
        .then((res)=>{
            setNotificationsEdited((prev)=>!prev)
            console.log(res)
            setDoneMessage(res.data.message)
            showDoneMessageNow()
        })
        .catch((err)=>setErrors({...errors,deleteAllError:err.response.message}));
    }

// ----------------------------------------------------------------

    const handleUnreadAll =()=>{
        setRefreshing(true);
        const base_url : string = "http://127.0.0.1:8000/api/notifications/unread";
        axios.get(base_url , {
            headers:{
                Accept:"application/json",
                Authorization:`Bearer ${localStorage.getItem("token")}`   
            }
        })
        .then(()=>{setNotificationsEdited((prev)=>!prev);setDoneMessage('تم التحديث');showDoneMessageNow();setRefreshing(false)})
        .catch((err)=>{setErrors({...errors,unreadAllError:err.response.message});setRefreshing(false)});
    }

// ----------------------------------------------------------------

// ----------------------------------------------------------------
    const unreadNotifs  = notifcations.filter((notif)=>notif.read_at == null);

    const readNotifs = notifcations.filter((notif)=>notif.read_at != null)
// ----------------------------------------------------------------

    useEffect(()=>{
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
    .catch(()=>setErrors({...errors,notificatiosUpdateErr:'حدث خطأ اثناء تحميل الاشعارات الرجاء تحديث الصفحة'}))
    },[notificationsEdited])

  return (
    <div className={`NotificationsDrawerContainer ${drawerOpend ? 'showDrawer' : ''} `} onClick={()=>setDrawerOpened(false)}>

        <div className={`drawer ${drawerOpend ? 'showDrawer' : ''} `} onClick={(e)=>e.stopPropagation()}>
            <div className="icons_container">
                <div className="refresh_contiainer" onClick={handleUnreadAll}>
                    <IoRefresh style={refreshingNotifs ? {animation:"spining 700ms ease-in-out 0s infinite normal"} : {}}/>
                </div>
                <div className="icon_container" onClick={()=>setDrawerOpened(false)}>
                    <FaXmark />
                </div>
            </div>

            <div className="btns_container">
                <button className='read_all happy_font' onClick={handleReadAll}>
                    تعليم كمقروء
                </button>
                <button className='delete_all happy_font' onClick={handleDeleteAll}>
                    حذف جميع الاشعارات
                </button>
            </div>

            <div className="notifications_container">
                <div className="latest">
                    <p>الأحدث:</p>
                    <div className="notifs">
                        {
                            unreadNotifs.map((notif)=>{
                                return(
                                    <div className="notification" key={notif.id}>
                                        <p className={`ntification_text ${notif.read_at != null ?  'readed' : ''}`}>
                                            {notif.data.message}
                                        </p>
                                        <div className="notif_actions">
                                            {
                                                notif.read_at == null &&
                                                <button className='mark_as_read happy_font' onClick={()=>handleMaskAsRead(notif.id)}>
                                                    تعليم كمقروء
                                                </button>
                                            }

                                            <button className='deleter_noti happy_font' onClick={()=>handleDeleteNotif(notif.id)}>
                                                حذف
                                            </button>
                                        </div>
                                        {
                                            notif.read_at == null ? 
                                            <div className="isReadDot"></div>
                                                :
                                            <></>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="oldest">
                    <p>الأقدم:</p>
                    <div className="notifs">
                        {readNotifs.map((notif)=>{
                            return(
                            <div className="notification" key={notif.id}>
                                <p className={`ntification_text ${notif.read_at != null ?  'readed' : ''}`}>
                                    {notif.data.message}
                                </p>
                                <div className="notif_actions">
                                    {
                                        notif.read_at == null &&
                                        <button className='mark_as_read happy_font' onClick={()=>handleMaskAsRead(notif.id)}>
                                            تعليم كمقروء
                                        </button>
                                    }

                                    <button className='deleter_noti happy_font' onClick={()=>handleDeleteNotif(notif.id)}>
                                        حذف
                                    </button>
                                </div>
                                {
                                    notif.read_at == null ? 
                                    <div className="isReadDot"></div>
                                        :
                                    <></>
                                }
                            </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="errorMessage_drawer">
                {errors.deleteAllError ? <p>{errors.deleteAllError}</p>
                :errors.deleteNotifError ? <p>{errors.deleteNotifError}</p>
                :errors.maskAsReadError ? <p>{errors.maskAsReadError}</p>
                :errors.notificatiosUpdateErr? <p>{errors.notificatiosUpdateErr}</p>
                :errors.read_all_Erro ? <p>{errors.read_all_Erro}</p>
                :errors.unreadAllError ? <p>{errors.unreadAllError}</p>
                :<></>
            }
            </div>
            { showDoneMessage &&
            <div className="doneMessage_drawer">
                <p>{doneMessage}</p>
            </div>
            }
        </div>
    </div>
  )
}

export default NotificationsDrawer
