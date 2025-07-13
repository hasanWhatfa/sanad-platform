import { NavLink } from "react-router-dom"
import './NavBar.css'
import { useEffect, useState } from "react"
import DropDownMenu, { type DropDownLink } from "../DropDownMenu/DropDownMenu"

interface NavBarProps{
  links:{
    linkName:string,
    linkTo:string,
    isDropDown?:boolean,
    dropDownLinks?:Array<DropDownLink>
  }[]
}


const NavBar = ({links} : NavBarProps) => {
  const[showMenu,setShowMenu] = useState(false);
  const[scrolling,setScrolling] = useState(false);   

    //track the scrolling to chage the appreance of the navBar
    useEffect(() => {
      const handleScroll = () => {
        setScrolling(window.scrollY > 10);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <>
      <div className={`topBanner px-162 ${scrolling ? 'topBannerHide' : ''}`}>
        <div className="bannerLeft">
          <p>
            وقت العمل    :
            24/7
          </p>
        </div>
        <div className="bannerRight">
          <p>:زورو صفحتنا على</p>
          <div className="bannerIconsContainer" >
            <a href="#"><img src="/icons/facebook-fill.svg" /></a>
            <a href="#"><img src="/icons/twitter-fill.svg" /></a>
            <a href="#"><img src="/icons/linkedin-fill.svg" /></a>
          </div>
        </div>
      </div>
      <nav className={`bg-screen-nav px-162 ${scrolling ? 'scrollingNav' : ''}`}>
        <div className="logoContainer">
          <h1>
            <img src="/icons/logo2.png" />
          </h1>
        </div>
        <div className="navLinks">
          {
            links.map((link, linkIndex) =>
              link.isDropDown ? (
                <DropDownMenu
                  key={linkIndex}
                  links={link.dropDownLinks || []}
                  label={link.linkName}
                />
              ) : (
                <NavLink
                  to={link.linkTo}
                  className={({ isActive }) => isActive ? 'activeLink' : ''}
                  key={linkIndex}
                >
                  {link.linkName}
                </NavLink>
              )
            )
          }
        </div>
        <div className="navBtns">
          <button>تسجل دخول</button>
          <button>ابدأ الاّن</button>
        </div>
      </nav>

      <nav className={`sm-screen-nav px-162 ${scrolling ? 'scrollingNav' : ''}`}>
          <img src=" /icons/bars.svg" className="bars" onClick={() =>setShowMenu(!showMenu)}/>
          <h1>سند</h1>
          <div className={`sm-screen-menu ${showMenu ? 'showNavMenu' : ''}`}>
                  <div className="sm-screen-nav-menu-top">
                    <div className="navLinks-sm-screen-header px-162">
                      <img src=" /icons/bars.svg" className="bars" onClick={()=>setShowMenu(false)}/>
                      <h1>سند</h1>
                    </div>
                    <div className="navLinks">
                        {links.map((link,linkIndex)=>{
                            return(
                            <NavLink key={linkIndex} to={link.linkTo} className={({isActive})=> isActive ? 'activeLink':''}>{link.linkName}</NavLink>                      
                        )
                        })}
                    </div>
                </div>
                <div className="navBtns">
                  <button>تسجل دخول</button>
                  <button>ابدأ الاّن</button>
                </div>
          </div>
      </nav>
    </>
  )
}

export default NavBar




                    // <NavLink to={link.linkTo} className={({isActive})=> isActive ? 'activeLink':''} key={linkIndex}
                    // onClick={(e)=>{e.target}}
                    // >
                    //   {link.isDropDown && <IoIosArrowDown />}
                    //   {link.linkName}
                    // </NavLink>