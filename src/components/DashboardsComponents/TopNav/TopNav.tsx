import './TopNav.css'
import { IoMdNotificationsOutline } from "react-icons/io"
// import { BsStars } from "react-icons/bs";
const TopNav = () => {
  return (
    <div className='TopNavDashboards'>
        <div className="logo_container">
            <img src="/public/icons/logo3.png" alt="sanad-logo" />
        </div>
        {/* <p className='happy_font some_text'>
            <BsStars />
            سندك نحو راحة البال
            <BsStars />
        </p> */}
      <button className="icon_container">
        <IoMdNotificationsOutline />
      </button>
    </div>
  )
}

export default TopNav
