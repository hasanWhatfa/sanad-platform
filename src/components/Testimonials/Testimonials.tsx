import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import './Testimonials.css'
import testimonialsData from "../../data/testimonialsData";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import TitleComponent from "../TitleComponent/TitleComponent";

const Testimonials = () => {
  return (
<section className="testimonials-carousel px-162">
        <TitleComponent title="شهادات عملائنا" desc="لدينا عدد كبير جدا من العملاء السعداء بالتعامل معنا, كن واحدا منهم"/>
      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{
          delay:1000,
        }}
      >
        {testimonialsData.map((item) => (
          <SwiperSlide key={item.id}>
            <TestimonialCard
              name={item.name}
              job={item.job}
              testimonial={item.testimonial}
              image={item.image}
              rating={item.rating}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonials
