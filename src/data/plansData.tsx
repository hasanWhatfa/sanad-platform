import type { ReactNode } from "react";
import { GiPeaceDove } from "react-icons/gi";
import { FaPeace } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";

interface planObject {
    name: string;
    price: number;
    featuers: Array<{ featName: string; available: boolean }>;
    paymentMethod: string;
    planIcon: ReactNode;
}

export const plansData: Array<planObject> = [
    {
        name: "باقة الأمل",
        price: 40,
        featuers: [
            { featName: "جلسة واحدة أسبوعيًا (30 دقيقة)", available: true },
            { featName: "مع أخصائي معتمد", available: true },
            { featName: "متابعة يومية عبر الرسائل", available: false },
            { featName: "إمكانية إلغاء الاشتراك في أي وقت", available: true },
        ],
        paymentMethod: "شهري",
        planIcon: <GiPeaceDove />,
    },
    {
        name: "باقة السعادة",
        price: 120,
        featuers: [
            { featName: "جلستين أسبوعيًا (45 دقيقة)", available: true },
            { featName: "مع طبيب/أخصائي محترف", available: true },
            { featName: "متابعة يومية عبر الرسائل", available: true },
            { featName: "تواصل إضافي مع الأخصائي عند الحاجة", available: true },
            { featName: "إمكانية إلغاء الاشتراك في أي وقت", available: true },
        ],
        paymentMethod: "شهري",
        planIcon: <FaPeace />,
    },
    {
        name: "باقة الرضا",
        price: 200,
        featuers: [
            { featName: "3 جلسات أسبوعيًا (60 دقيقة)", available: true },
            { featName: "مع فريق متخصص (أطباء + أخصائيين)", available: true },
            { featName: "متابعة يومية + خط دعم طارئ", available: true },
            { featName: "استشارة فورية عند الحاجة (24/7)", available: true },
            { featName: "إمكانية إلغاء الاشتراك في أي وقت", available: true },
        ],
        paymentMethod: "شهري",
        planIcon: <FaHandHoldingHeart />,
    },
];
