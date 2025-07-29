import { Link } from 'react-router-dom';
import './SideBar.css'
import { useState, type ReactNode } from 'react';
import { FiLogOut } from "react-icons/fi";
import { image_base, type User } from '../../../data/generalTypes';
interface SideBarProps{
    links:{
        linkText:string;
        linkTo:string;
        icon:ReactNode;
    }[]
}
const SideBar = ({links}:SideBarProps) => {
    const [activeLink,setActiveLink] = useState<string>(links[0].linkText);
    const user_data_raw = localStorage.getItem('user_data');
    const user_data = user_data_raw ? JSON.parse(user_data_raw) as User : null;
    const user_full_name = (user_data?.first_name +" "+ user_data?.last_name).includes('undefined') ? 'اسم المستخدم' 
    : user_data?.first_name +" "+ user_data?.last_name

    // for the log out request
    const handleLogOut =()=>[
        console.log('loged out')
    ]
  return (
    <div className='sideBar_container'>

        <div className="user_info_section">
            <div className="user_image_container">
                <img src={`${image_base}/${user_data?.avatar}`} alt="user-image" />
            </div>
            <h3>{user_full_name ? user_full_name :'اسم المستخدم'}</h3>
        </div>
        <div className="links_section">
            <nav>
                {links.map((link,index)=>{
                    return(
                        <Link key={index} to={link.linkTo}
                        className={`${link.linkText == activeLink ? 'activeLinkSideBar' : ''}`}
                        onClick={()=>setActiveLink(link.linkText)}>
                            {link.icon} {link.linkText}
                        </Link>
                    )
                })}
            </nav>
            <button onClick={handleLogOut}>
                <p>
                تسجيل الخروج
                </p>
                <FiLogOut />
            </button>
        </div>

    </div>
  )
}

export default SideBar
