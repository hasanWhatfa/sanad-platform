import { footerLinksData } from "../../data/footerData"
import { socialMediaLinks } from "../../data/footerData"
import FooterLink from "./FooterLink"
import './Footer.css'

const Footer = () => {
  return (
    <footer className="px-162">
      <div className="footerTopContent">
        <div className="logoContainer">
          <img src="/images/leenslogo.jpg" alt="logo" className="logoFooter" />
          <p>
            منصة سند هي منصة عربية تهدف لمساعدة الناس على الحصول على حياة افضل.
            منصة سند هي منصة عربية تهدف لمساعدة الناس على الحصول على حياة افضل.
            منصة سند هي منصة عربية تهدف لمساعدة الناس على الحصول على حياة افضل.
          </p>
        </div>
        {
          footerLinksData.map((ob,index)=>{
            return(
              <FooterLink key={index} data={ob}/>
            )
          })
        }
      </div>
      <div className="grayLineFooter"></div>
      <div className="footerBottomContent">
        <div className="footerBottomContent-top">
          <div className="leftSide">
            <button>
              سجل دخول
            </button>
            <button>
              انشئ حساب 
            </button>
          </div>
          <div className="rightSide">
            <p>تواصل معنا</p>
            <div className="socialMedia-footer">
              {
                socialMediaLinks.map((icon,iconIndex)=>{
                  return(
                    <a href={icon.linkTo} key={iconIndex}>
                      {icon.icon}
                    </a>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="grayLineFooter"></div>
        <div className="footerBottomContent-bottom">
          <div className="policy">
            <a href="#">شروط الاستخدام</a>
            |
            <a href="#">حقوق الملكية</a>
          </div>
          <p className="hafeza">جميع الحقوق محفوظة لدى حفيظة</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
