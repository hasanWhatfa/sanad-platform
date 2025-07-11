import React from 'react';
import './MainHero.css';
import GradientText from '../GradientText/GradientText';

const MainHero: React.FC = () => {
  return (
    <section className="mainHero-section">
      <div className="mainHero-container">

        {/* Text Content */}
        <div className="mainHero-text">
          <h1 className="mainHero-title animate-fadeUp delay-1">
            <GradientText
            colors={['#1D3557','#457B9D','#CAF0F8','#1D3557']}
            className='cursor-none'
            animationSpeed={9.3}
            >
                منصة سند للدعم النفسي
            </GradientText>

          </h1>
          <p className="mainHero-subtitle animate-fadeUp delay-2">
                خطوتك الأولى نحو نفس مطمئنة تبدأ من هنا
          </p>
          <button className="mainHero-button animate-fadeUp delay-3">
            ابدأ رحلتك الآن
          </button>
        </div>

        {/* Background Shapes */}
        <div className="mainHero-shapes">
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="shape shape-blob"
          >
            <path
              fill="#5D8275"
              d="M38.5,-59.3C49.7,-50.4,59.5,-41.7,65.2,-30.6C70.9,-19.5,72.6,-6.1,70.8,6.4C69,18.9,63.6,30.6,55.3,40.7C47,50.9,35.9,59.5,23.3,64.2C10.7,68.9,-3.5,69.6,-16.2,65.3C-28.9,61.1,-40.1,52,-49.7,41.1C-59.3,30.3,-67.3,17.7,-69.2,3.5C-71,-10.7,-66.7,-26.5,-58.7,-39.4C-50.7,-52.3,-38.9,-62.4,-25.2,-68.1C-11.5,-73.8,4,-75.1,18.6,-70.4C33.2,-65.7,47.3,-55.9,38.5,-59.3Z"
              transform="translate(100 100)"
            />
          </svg>
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="shape shape-circle"
          >
            <circle cx="100" cy="100" r="100" fill="#eb5b5b" />
          </svg>
        </div>

      </div>
    </section>
  );
};

export default MainHero;
































































































































// import './MainHero.css'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css'
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { Pagination, Navigation, Autoplay } from 'swiper/modules';
// const MainHero = () => {
//   return (
    
//     <div className='mainHero'>
//         <Swiper 
//         slidesPerView={1}
//         spaceBetween={30}
//         // autoplay={
//         //     true
//         // }
//         loop={true}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true}
//         modules={[Pagination, Navigation,Autoplay]}
//         className="mySwiper"
//         >
//             <SwiperSlide>
//                 <div className="heroContent px-162">
//                     <div className="heroText">
//                         <div className="heroTextHeader">
//                             <h2>
// 
// منصة سند للدعم النفسي
// /h2>
//                             <p>خطوتك الأولى نحو نفس مطمئنة تبدأ من هنا</p>
//                         </div>
//                         <button className="ctaBtn">احجز جلستك الأولى</button>
//                     </div>
//                     <img src="/images/heroImage1.jpg" className='heroImage' />
//                     <div className="darkLayout"></div>

//                 </div>
//             </SwiperSlide>
//             <SwiperSlide >
//                 <div className="heroContent  px-162">
//                     <div className="heroText">
//                         <div className="heroTextHeader">
//                             <h2>اهلا بك في منصة سند</h2>
//                             <p>تلقى العلاج عن طريقك منصتنا في اي زمان ومكان وبخصوصية تامة</p>
//                         </div>
//                         <button className="ctaBtn">احجز جلستك الأولى</button>
//                     </div>
//                     <img src="/images/heroImage2.jpg" className='heroImage' />
//                     <div className="darkLayout"></div>
//                 </div>            
//             </SwiperSlide>
//         </Swiper>
//     </div>
//   )
// }

// export default MainHero




// // full back
//         {/* <Swiper spaceBetween={10} slidesPerView={1} autoplay={true}>
//             <SwiperSlide>
//                 <div className="heroContent px-162">
//                     <div className="heroText">
//                         <div className="heroTextHeader">
//                             <h2>اهلا بك في منصة سند</h2>
//                             <p>خطوتك الأولى نحو نفس مطمئنة تبدأ من هنا.</p>
//                         </div>
//                         <button className="ctaBtn">احجز جلستك الأولى</button>
//                     </div>
//                     <img src="/images/heroImage1.jpg" className='heroImage' />
//                     <div className="darkLayout"></div>

//                 </div>
//             </SwiperSlide>
            
//             <SwiperSlide>
//                 <div className="heroContent  px-162">
//                     <div className="heroText">
//                         <div className="heroTextHeader">
//                             <h2>اهلا بك في منصة سند</h2>
//                             <p>استشارة نفسية آمنة… بضغطة زر.</p>
//                         </div>
//                         <button className="ctaBtn">اكتشف المعالجين</button>
//                     </div>
//                     <img src="/images/heroImage2.jpg" className='heroImage' />
//                     <div className="darkLayout"></div>
//                 </div>            
//             </SwiperSlide>
//         </Swiper> */}



//     //      <div className="heroText">
//         //     <h1>تلقى العلاج عن طريق منصتنا في اي زمان ومكان وبخصوصية تامة</h1>
//         //     <button className="CTABTN">
//         //         احجز جلستك الاولى
//         //     </button>
//         // </div>