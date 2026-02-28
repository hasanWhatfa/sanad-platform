import { Link, Outlet } from 'react-router-dom'
import AboutUsHero from '../../components/AboutUsHero/AboutUsHero'
import './Doctors.css'
import sliceArray from '../../components/SliceArr'
import TitleComponent from '../../components/TitleComponent/TitleComponent'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../redux/store'
import { useEffect } from 'react'
import { fetchDox } from '../../redux/slices/PubDoctors'
import { image_base, type DoctorMainType } from '../../data/generalTypes'

const Doctors = () => {
  const {doctorsPub} = useSelector((state : RootState)=>state.doctorsPub);
  const dispatch = useDispatch<AppDispatch>();
  const DoctorsRows = sliceArray(doctorsPub, 3);

  useEffect(() => {
    dispatch(fetchDox());
  },[]);
  return (
    <main className='DoctorsPage'>
      <AboutUsHero 
        title='تعرف على اطبائنا واختر الطبيب الذي ترتاح له لتبدأ رحلة علاجك'
        talk='جميع الاطباء والاخصائيون لدينا محترفون وحاصلون على ابرز الشهادات في مجال الطب والدعم النفسي'
        img='/images/docPhoto.webp'
      />

      <div className="px-162">
        <TitleComponent 
          title='اطبائنا' 
          desc='زر صفحة الطبيب لتعرف معلومات اكثر عنة' 
        />
      </div>

      <div className="doctors-list px-162">
        {DoctorsRows.map((row, rowIndex) => (
          <div className="doctors-row" key={rowIndex}>
            {row.map((doctor : DoctorMainType, i) => (
              <div className="doctor-card" key={i}>
                <div className="doctor-card__image">
                  <img src={`${image_base}/${doctor.avatar}`} alt="doctor" />
                </div>
                <div className="doctor-card__text">
                  <h3>{doctor.first_name + ' ' + doctor.last_name}</h3>
                  <h5>{doctor.specialization}</h5>
                </div>
                <Link to={`/doctor/${doctor.id}`}>
                  المزيد من المعلومات حول الطبيب
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Outlet />
    </main>
  )
}

export default Doctors
