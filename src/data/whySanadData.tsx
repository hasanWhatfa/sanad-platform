import type { ReactNode } from "react";
import { FaCalendar } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaRedo } from "react-icons/fa";
import { TbChartHistogram } from "react-icons/tb";
interface whySanadCardData{
    icon:ReactNode;
    title:string;
    text:string;
}

export const whySanadData :Array<whySanadCardData>  = [
    {
        icon:<FaCalendar />,
        title:' جلسات استشارية عبر الإنترنت 24/7',
        text:'نوفر لك جلسات استشارية نفسية متاحة على مدار الساعة، مما يتيح لك الحصول على الدعم في أي وقت وأينما كنت. كل ما عليك فعله هو حجز موعد يناسب جدولك الزمني.'
    },
    {
        icon:<FaUserDoctor/>,
        title:'أطباء متخصصون ومعتمدون',
        text:'فريقنا يتكون من أطباء نفسيين متخصصين ومعتمدين يقدمون استشارات علاجية عالية الجودة في مختلف المجالات النفسية. يمكنك الاطمئنان إلى أنهم يملكون الخبرة والمهارات اللازمة لتقديم أفضل رعاية.'
    },
    {
        icon:<GiReceiveMoney />,
        title:'باقات مخصصة لكل احتياج',
        text:' نحن نقدم باقات مرنة تلبي احتياجاتك الخاصة، سواء كنت بحاجة إلى استشارة واحدة أو خطة علاجية طويلة الأمد. اختر الباقة التي تناسبك وابدأ رحلتك نحو الصحة النفسية.'
    },
    {
        icon:<MdOutlinePrivacyTip />,
        title:'سرية تامة وخصوصية',
        text:'خصوصيتك هي أولويتنا القصوى. نحن نضمن لك سرية تامة في كل جلسة، حيث يتم تخزين بياناتك بشكل آمن وفقًا لأعلى معايير الحماية والخصوصية.'
    },
    {
        icon:<FaRedo />,
        title:'متابعة مستمرة مع الأطباء',
        text:'التقدم في العلاج يتطلب متابعة مستمرة، لذا نحن نوفر لك إمكانية حجز جلسات متابعة مع الأطباء لضمان استمرارية الدعم وتحقيق أفضل النتائج على المدى الطويل.'
    },
    {
        icon:<TbChartHistogram />,
        title:'تقييم أسبوعي وشهري لحالتك النفسية',
        text:'نحن نوفر لك تقارير تقييم دورية أسبوعية وشهرية لحالتك النفسية. هذه التقييمات تساعدك على تتبع تقدمك في العلاج وتعديل الاستراتيجيات العلاجية عند الحاجة.'
    }
]