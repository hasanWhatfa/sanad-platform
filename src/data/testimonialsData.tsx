export interface Testimonial {
  id: number;
  name: string;
  job: string;
  testimonial: string;
  image: string; // اتركها فاضية لتضيف صورة لاحقاً
  rating: number; // تقييم من 1 إلى 5
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "سارة أحمد",
    job: "مديرة تسويق",
    testimonial: "المنصة ساعدتني كثيرا في تحسين صحتي النفسية، والأطباء كانوا محترفين جدا.",
    image: "/images/woman1.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "علي محمد",
    job: "مهندس برمجيات",
    testimonial: "وجدت الدعم النفسي الذي كنت أبحث عنه بطريقة سهلة وسريعة.",
    image: "/images/manStanding1.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "ليلى حسن",
    job: "مصممة جرافيك",
    testimonial: "التجربة كانت مريحة ومفيدة، أنصح الجميع باستخدام المنصة.",
    image: "/images/woman2.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "يوسف إبراهيم",
    job: "طالب جامعي",
    testimonial: "خدمة ممتازة، والأطباء متعاونين ويفهمون مشاكلك بعمق.",
    image: "/images/manStanding2.jpg",
    rating: 4,
  },
  {
    id: 5,
    name: "ندى سمير",
    job: "مهندسة معمارية",
    testimonial: "المنصة من أفضل الطرق للحصول على استشارة نفسية بسهولة وثقة.",
    image: "/images/woman3.jpg",
    rating: 5,
  },
  {
    id: 6,
    name: "عمر عبد الله",
    job: "مدير مشروع",
    testimonial: "التقييم الكامل للأطباء يعطي ثقة كبيرة لاختيار الطبيب المناسب.",
    image: "/images/manStanding3.jpg",
    rating: 4,
  },
  {
    id: 7,
    name: "ريم مصطفى",
    job: "محاسبة",
    testimonial: "أشكر فريق العمل على الدعم المستمر والمساعدة في تخطي الأزمات النفسية.",
    image: "/images/woman2.jpg",
    rating: 5,
  },
];

export default testimonialsData;
