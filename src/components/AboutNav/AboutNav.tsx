import { Link } from 'react-router-dom'
import './AboutNav.css'
import { useState } from 'react'

const AboutNav = () => {
    const [activeLink,setActiveLink] = useState('/about');
  return (
    <div className='aboutNav px-162'>
      <Link to={'/about'} onClick={()=>setActiveLink('/about')} className={`${activeLink == '/about' ? 'activeLInk': ""}`}>من نحن</Link>
      <span>|</span>
      <Link to={'/about/doctors'} onClick={()=>setActiveLink('/about/doctors')}className={`${activeLink == '/about/doctors' ? 'activeLInk': ""}`}>الاطباء و المعالجين</Link>
      <span>|</span>
      <Link to={'/about/faqAll'} onClick={()=>setActiveLink('/about/faqAll')}className={`${activeLink == '/about/faqAll' ? 'activeLInk': ""}`}>خدماتنا</Link>
    </div>
  )
}

export default AboutNav
