import { Link, Outlet } from 'react-router-dom'
import AboutUsHero from '../../components/AboutUsHero/AboutUsHero'
import './Doctors.css'
import sliceArray from '../../components/SliceArr'
import doctorsData from '../../data/doctorsData'
import TitleComponent from '../../components/TitleComponent/TitleComponent'
const Doctors = () => {
  const DoctorsRows = sliceArray(doctorsData,3);
  // must fetch doctors data from the API
  return (
    <main  className='DoctorsPage'>
      <AboutUsHero 
      title='تعرف على اطبائنا واختر الطبيب الذي ترتاح له لتبدأ رحلة علاجك'
      talk='جميع الاطباء والاخصائيون لدينا محترفون وحاصلون على ابرز الشهادات في مجال الطب والدعم النفسي'
      img='/images/docPhoto.webp'
       />
       <div className="px-162">
        <TitleComponent title='اطبائنا' desc='زر صفحة الطبيب لتعرف معلومات اكثر عنة' />
       </div>
       <div className="doctors-list px-162">
        {
          DoctorsRows.map((doc,docIndex)=>{
            return(
              <div className="doctorsROw" key={docIndex}>
                {
                  doc.map((x,i)=>{
                    return(
                      <div className="doctorCard--hw" key={i}>
                        <div className="doctorCard--hw-image">
                          <img src={x.image} alt="doctor Image" />
                        </div>
                        <div className="doctorCard--hw-text">
                          <h3>{x.name}</h3>
                          <h5>{x.description}</h5>
                        </div>
                        <Link to={`/doctor/${x.id}`}>المزيد من المعلومات حول الطبيب</Link>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
       </div>
      <Outlet />
    </main>
  )
}

export default Doctors
