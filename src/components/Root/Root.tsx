import { Outlet, useLocation } from "react-router-dom"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"
import { useEffect } from "react"
import { type DropDownLink } from "../DropDownMenu/DropDownMenu"
import ScrollToTop from "../ScrollToTop/ScrollToTop"
import AuthForm from "../../pages/Auth/AuthForm"
import { useAuthModal } from "../../context/AuthModalContext"

interface LinksObject {
    linkName:string,
    linkTo:string,
    isDropDown?:boolean,
    dropDownLinks?:Array<DropDownLink>
}


const Root = () => {
  const { pathname } = useLocation();
  //go to top each time the url changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const links: LinksObject[] =[
    {
      linkName:'الصفحة الرئيسية',
      linkTo:''
    },
    {
      linkName:'من نحن',
      linkTo:'about'
    }
    ,
    {
      linkName:'اختبارات نفسية',
      linkTo:'/#',
      isDropDown:true,
      dropDownLinks:[
        {
          linkText:'اختبار الاكتئاب',
          linkTo:'depression'
        },
        {
          linkText:'اختبار التعلق',
          linkTo:'attachment'
        },
        {
          linkText:'الرهاب',
          linkTo:'phobia'
        },
        {
          linkText:'اختبار القلق',
          linkTo:'anxiety'
        },
        {
          linkText:'اختبار الإدمان',
          linkTo:'addiction'
        },
        {
          linkText:'اختبار اضطراب نقص الانتباه',
          linkTo:'adhd'
        },
      ]
    },
    {
      linkName:'العاب تفاعلية',
      linkTo:'interactiveGames'
    },
    {
      linkName:'مكتبة صوتية/مرئية',
      linkTo:'library'
    },
    {
      linkName:'مدونات',
      linkTo:'articles'
    },
    {
      linkName:'تواصل معنا',
      linkTo:'contactus'
    },
  ]
  const { authType, closeModal } = useAuthModal();
  useEffect(() => {
    if (authType) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [authType]);
  return (
    <div className="RootClass">
    <NavBar links={links} />
    {
      authType ? (
      <div className="ModalContainer" onClick={closeModal}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
          <AuthForm />
        </div>
      </div>
      ): null
    }

    <ScrollToTop />
        <Outlet />
    <Footer />
    </div>
  )
}

export default Root
