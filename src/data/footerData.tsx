import type { ReactNode } from "react";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
interface  FooterLinkData{
    title:string;
    links: FooterLinks[]
}
type FooterLinks = {
    linkName:string,
    linkTo:string
}

export const  footerLinksData : FooterLinkData[] =[{
    title:'من نحن',
    links:[
            {
                linkName:'الاطباء والمعالجين',
                linkTo:'/about'
            },
            {
                linkName:'خدماتنا',
                linkTo:"/about/services"
            },
            {
                linkName:'الاسئلة الشائعة',
                linkTo:'/about/faqPage'
            }
    ]
},
    {
        title:'الاختبارات النفسية',
        links:[
            {
                linkName:'اختبار الاكتئاب',
                linkTo:'/test/depression'
            },
            {
                linkName:'اختبار التوتر',
                linkTo:'/test/nervous'
            },
            {
                linkName:'اختبار القلق',
                linkTo:'/test/anxiety'
            },
            {
                linkName:'اختبار الاضطراب الاجتماعي',
                linkTo:'/test/adhd'
            },
        ]
    },
    {
        title:'مدونات',
        links:[
            {
                linkName:'الاكتئاب',
                linkTo:'/articles/depression'
            },        
            {
                linkName:'اضطراب ما بعد الصدمة',
                linkTo:'/articles/truma'
            },        
            {
                linkName:'لغة الجسد',
                linkTo:'/articles/bodyLanguage'
            },        
            {
                linkName:'نوبات الهلع',
                linkTo:'/articles/panicAttacks'
            },        
        
        ]
    }
]
interface socialMediaLink{
    icon: ReactNode;
    linkTo:string
}
export const socialMediaLinks :  socialMediaLink[] =[
    {
        icon:<FaFacebook />,
        linkTo:'facebook.com'
    },
    {
        icon:<FaWhatsapp />,
        linkTo:'whatsApp.com'
    },
    {
        icon:<FaTwitter />,
        linkTo:'twitter.com'
    },
    {
        icon:<FaInstagram />,
        linkTo:'instagram.com'
    },
]