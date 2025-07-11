import DocCard from '../DocCard/DocCard';
import './WorkTeam.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { RiArrowLeftDoubleLine } from "react-icons/ri";

import doctorsData from '../../data/doctorsData';
import { useState } from 'react';

const WorkTeam = () => {
  // نخزن الطبيب المختار كاملاً لتسهيل التعامل مع البيانات
  const [chosenDoctor, setChosenDoctor] = useState(doctorsData[0]);

  return (
    <section className='workTeam'>
      <div className="workTeamHeader">
        <h2>تعرف على فريقنا</h2>
        <p>نقدم لك في منصة خدمة العلاج و الاستشارة النفسية عن طريق مجموعة من افضل وامهر الاطباء على مستوى الوطن العربي والعالم</p>
      </div>
      <div className="doctorsShow-container">
        <div className="displayedDoc">
          <div className="top">
            <div className="choosenDocImage">
              {/* الصورة الآن تتغير حسب الطبيب المختار */}
              <img src={chosenDoctor.image || "/images/docPhoto.webp"} alt={`${chosenDoctor.name} photo`} />
            </div>
          </div>
          <div className="displayedDocInfo">
            <div className="docName">
              <h3>{chosenDoctor.name}</h3>
              <p className='someBoldTextAboutTheDoc'>{chosenDoctor.description}</p>
            </div>
            <ul className="docAchivments">
              {chosenDoctor.achievements.map((ach, index) => (
                <li key={index}>
                  {ach} <RiArrowLeftDoubleLine />
                </li>
              ))}
            </ul>
          </div>
          <button className='choosenDocBTN'>
            المزيد من المعلومات حول الطبيب
          </button>
        </div>

        <div className="leftSide">
          <div className="leftSide-heading">
            <h3>لدينا مجموعة من افضل اطباء العالم</h3>
            <p>الاطباء لدينا جيدون جدا يمكنهم معالجتك من اي جنون لديك بدون اي مشكلة, اختر الطبيب الذي يناسبك ونحن لك بالمرصاد</p>
          </div>
          <div className="doctors-all">
            <Swiper
              className="mySwiper"
              slidesPerView={3}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
            >
              {doctorsData.map((doc) => (
                <SwiperSlide
                  key={doc.id}
                  onClick={() => setChosenDoctor(doc)}
                  style={{ cursor: "pointer" }}
                >
                  <DocCard
                    docName={doc.name}
                    docImage={doc.image}
                    docDesc={doc.description}
                    docID={doc.id}
                    choosenDoc={chosenDoctor.id == doc.id}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkTeam;
