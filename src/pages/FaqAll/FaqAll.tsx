import "./FaqAll.css";
import { FaCalendarCheck, FaBrain, FaBookOpen, FaHeadphones, FaPuzzlePiece, FaCrown } from "react-icons/fa";

const servicesData = [
  {
    title: "حجز المواعيد",
    description:
      "احجز جلساتك مع المختصين النفسيين بسهولة، وتعرف على إنجازاتهم وتقييماتهم قبل الحجز.",
    icon: <FaCalendarCheck />,
  },
  {
    title: "الاختبارات النفسية",
    description:
      "قم بإجراء اختبارات نفسية تفاعلية تساعدك على فهم نفسك بشكل أعمق مع نتائج دقيقة وتوصيات عملية.",
    icon: <FaBrain />,
  },
  {
    title: "المقالات",
    description:
      "اقرأ مقالات متنوعة وغنية بالمعلومات حول الصحة النفسية، الإدمان، العلاقات، والدعم النفسي.",
    icon: <FaBookOpen />,
  },
  {
    title: "المكتبة الصوتية",
    description:
      "استمع إلى مقاطع صوتية مريحة تساعدك على الاسترخاء والتأمل وتحسين مزاجك.",
    icon: <FaHeadphones />,
  },
  {
    title: "الألعاب التفاعلية",
    description:
      "أنشطة ممتعة تساعدك على التخلص من التوتر والتفريغ النفسي بطريقة بسيطة ومسلية.",
    icon: <FaPuzzlePiece />,
  },
  {
    title: "الباقات والاشتراكات",
    description:
      "اختر من بين خطط اشتراك متعددة تناسب احتياجاتك، مع طرق دفع سهلة وآمنة.",
    icon: <FaCrown />,
  },
];

const Services = () => {
  return (
    <section className="services">
      <div className="services-header">
        <h2>خدماتنا</h2>
        <p>نقدم لك باقة متكاملة من الخدمات لدعم صحتك النفسية بكل حب ورعاية.</p>
      </div>
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
