import type { ReactNode } from "react";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import { PiStarBold } from "react-icons/pi";
import { RiMentalHealthLine } from "react-icons/ri";

export interface UserMainPageCard{
    title:string;
    linkTo:string;
    icon:ReactNode;
    bgShape:string;
    bgColor:"toBlue"| "toPurpule" | "toGreen" | "toOrange"
}


export const  userMainPageCardsData :Array<UserMainPageCard>=[
    {
        title:'تعديل بياناتي',
        linkTo:'edit-patient-data',
        icon:<IoMdSettings />,
        bgShape:'/images/whiteDots.png',
        bgColor:'toBlue'
    },
    {
        title:'اجراء اختبار',
        linkTo:'patient-tests',
        icon:<RiMentalHealthLine />,
        bgShape:'',
        bgColor:'toPurpule'
    },
    {
        title:'معلومات جلساتي',
        linkTo:'my-sessions',
        icon:<AiOutlineSchedule />,
        bgShape:'',
        bgColor:'toGreen'
    },
    {
        title:'تقييم طبيب',
        linkTo:'patient-rate',
        icon:<PiStarBold />,
        bgShape:'',
        bgColor:'toOrange'
    },

]
