import { useEffect, useState } from 'react';
import './ScrollToTop.css'
import { IoIosArrowRoundUp } from "react-icons/io";


const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
      useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 200) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior:"smooth",
        });
      };
    
  return (
    <button
      className={`scrollToTopBtn ${isVisible ? 'showScrollBtn' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <IoIosArrowRoundUp />
    </button>
  )
}

export default ScrollToTop
