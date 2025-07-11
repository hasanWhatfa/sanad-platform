import type { ReactNode } from "react";
import { GiPeaceDove } from "react-icons/gi";
import { FaPeace } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
interface planObject{
    name:string;
    price:number;
    featuers:Array<{featName:string,available:boolean}>;
    paymentMethod:string;
    planIcon:ReactNode;
}

export const plansData : Array<planObject> = [
    {
        name:'باقة الأمل',
        price:40,
        featuers:[
        {
            featName:'جلسة واحدة اسبوعيا',
            available:true
        },
        {
            featName: "مدة الجلسة 30 دقيقة مع اخصائي" ,
            available:true
        },
        {
            featName:"لا يوجد متابعة يومية",
            available:false,
        },
        {
            featName:"يمكنك الغاء الاشتراك في أي وقت",
            available:true,
        }
    ],
        paymentMethod:'تدفع دفعة واحدة',
        planIcon:<GiPeaceDove />
    },
    {
        name:'باقة السعادة',
        price:125,
        featuers:[
            {
                featName:'جلستين اسبوعيا',
                available:true
            },
            {
                featName:'مدة الجلسة 45 دقيقة مع طبيب محترف',
                available:true
            },
            {
                featName:'يوجد متابعة يومية',
                available:true
            },
            {
                featName:'يمكنك التواصل مع الاخصائيين عدة مرات في الأسبوع',
                available:true
            },
            {
                featName:'يمكنك الغاء الاشتراك في أي وقت',
                available:true
            },

        ],
        paymentMethod:'تدفع على شهرين',
        planIcon:<FaPeace />

    },
    {
        name:'باقة الرضا',
        price:175,
        featuers:[
            {
                featName:'اثنا عشر جلسة خلال اسبوعين',
                available:true
            },
            {
                featName:'يوجد متابعة يومية',
                available:true
            },
            {
                featName:'يمكنك الحصول على استشارة نفسية في أي وقت',
                available:true
            },
            {
                featName:'يمكنك الغاء الاشتراك في أي وقت',
                available:true
            },
        ],
        paymentMethod:'تدفع خلال شهرين',
        planIcon:<FaHandHoldingHeart />
    }
]