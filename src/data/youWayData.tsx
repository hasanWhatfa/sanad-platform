import type { ReactNode } from "react";
import { RiMentalHealthLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMeditation } from "react-icons/gi";
interface youWayObject{
    img:ReactNode;
    heading:string;
    talk:string;
}

export const youWayData : Array<youWayObject> =[
    {
        img:<RiMentalHealthLine />,
        heading:'ابدأ جلساتك العلاجية',
        talk:"الخطوة الاولى نحو راحة البال"
    },
    {
        img:<FaCalendarAlt />,
        heading:'حدد الوقت المناسب لك',
        talk:'يمكنك اختيار الموعد المناسب لك بدون اي قيود'
    },
    {
        img:<FaUserDoctor />,
        heading:'الكثير من المختصين',
        talk:'لدينا الكثير من مقدمي الرعاية المحترفين والمتسعدون دائما لمساعدتك'
    },
    {
        img:<GiMeditation />,
        heading:'حرر عقلك واسترخي في مكانك',
        talk:'لست بحاجة للذهاب الى اي مكان, استرخي في منزلك واحصل على افضل عناية'
    }
]