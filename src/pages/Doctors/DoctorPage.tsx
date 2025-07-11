import { useParams } from 'react-router-dom'
import doctorsData from '../../data/doctorsData';
import './DoctorPage.css'
import CommentComponent from '../../components/CommentComponent/CommentComponent';
import { IoCheckmarkDone } from "react-icons/io5";
import PageWrapper from '../../components/Root/PageWrapper/PageWrapper';
// Doctor Interface
export interface Review {
  userName: string;
  userImage: string;
  comment: string;
  rating: number;
}

export interface Doctor {
  id: number;
  name: string;
  description: string;
  breif: string;
  achievements: string[];
  image: string;
  review: Review[];
}

const DoctorPage = () => {
  const params = useParams();
  const numId = Number(params.id);
  // doctor's data must be fetched from the API.
  const doctor : (Doctor | undefined) = doctorsData.find((doc)=>{
    return doc.id == numId;
  });
  // making the Ratings function

  // this function will give the rates array , you can use it to check the number of rates
  const ratingArr = (doctor : Doctor | undefined)=>{
    let totalReviews = doctor!.review!.length;
    let ratingsArr : Array<number> = [];
    for(let i = 0 ;i<totalReviews ; i++ ){
      ratingsArr.push(doctor!.review[i].rating);
    }
    return ratingsArr;
  }
  //call this function to get an object has the fequence of each rate value
  const ratingCalc =()=>{
    const ratingsArray : Array<number> = ratingArr(doctor);
    const ratesValues = {
      one:0,
      two:0,
      three:0,
      four:0,
      five:0,
    }
    ratingsArray.map((item)=>{
        item == 5 ? ratesValues.five++ : item == 4 ? ratesValues.four++ : item == 3 ? ratesValues.three++ :item == 2 ? ratesValues.two++ : ratesValues.one++});
    const resutlObject = {
      one:(ratesValues.one / doctor!.review.length) * 100,
      tow:(ratesValues.two / doctor!.review.length) * 100,
      three:(ratesValues.three / doctor!.review.length) * 100,
      four:(ratesValues.four / doctor!.review.length) * 100,
      five:(ratesValues.five / doctor!.review.length) * 100
    }

    return resutlObject;
  }
  const doctorRatingsFinal = ratingCalc();

  const renderStars = ()=>{
    const stars : Array<number> = [doctorRatingsFinal.one,doctorRatingsFinal.tow,doctorRatingsFinal.three,doctorRatingsFinal.four,doctorRatingsFinal.five];
    let maxNum = stars[0];
    for(let i = 0; i< stars.length ; i++){
      if(maxNum < stars[i]){
        maxNum = stars[i]
      }
    }
    for(let j =0 ; j< maxNum ; j++){
      return(
        <span>*</span>
      )
    }
  }


  return (
    <PageWrapper>
      <main className='DoctorPage px-162'>
        <div className="DoctorInfo-one">
          <div className="img-cont">
            <img src={doctor?.image} alt="doctor's image" />
          </div>
          <div className="name-cont">
            <h3>{doctor?.name}</h3>
            <p>{doctor?.description}</p>
          </div>
        </div>
        <div className="DoctorInfo-two">
          <h3>نبذة تعريفية عن الطبيب:</h3>
          <p>{doctor?.breif}</p>
        </div>
        <div className="DoctorInfo-three">
          <h3>الانجازت و العضويات:</h3>
          <ul className='DoctorAchivments'>
            {doctor?.achievements.map((achiv,achiveIndex)=>{
              return(
                <li key={achiveIndex}><IoCheckmarkDone /> {achiv}</li>
              )
            })}
          </ul>
        </div>
        <div className="DoctorInfo-four">
          <h3>التعلقيات:</h3>
          <div className="everyThingContainer">
  
  {/* needs a lot of work here , first make the singleLine as a component , second fix the renderStars logic
  and last but not least fix the code so it become more react friendly  , 
    render stars function must render n star based on the most frequit rate for the doctor by the clients*/}

            <div className="rating-main-container">
              <div className="starsDisplay">
                  <div className="stars-container">
                    {renderStars()}
                  </div>
              </div>
              <div className="ratesThing">
                <div className="linesContainer">
                  <div className="single-line-container">
                    <h4>5</h4>
                    <div className="primaryLine-precentage">
                      <div className="primaryLine">
                        <div className="yellowLine" style={{
                          width:`${doctorRatingsFinal.five}%`
                        }}></div>
                      </div>
                      <h5 className="precentageContainer">
                        {doctorRatingsFinal.five} %
                      </h5>
                    </div>
                  </div>
                  <div className="single-line-container">
                    <h4>4</h4>
                    <div className="primaryLine-precentage">
                      <div className="primaryLine">
                        <div className="yellowLine" style={{
                          width:`${doctorRatingsFinal.four}%`
                        }}></div>
                      </div>
                      <h5 className="precentageContainer">
                        {doctorRatingsFinal.four} %
                      </h5>
                    </div>
                  </div>
                  <div className="single-line-container">
                    <h4>3</h4>
                    <div className="primaryLine-precentage">
                      <div className="primaryLine">
                        <div className="yellowLine" style={{
                          width:`${doctorRatingsFinal.three}%`
                        }}></div>
                      </div>
                      <h5 className="precentageContainer">
                        {doctorRatingsFinal.three} %
                      </h5>
                    </div>
                  </div>
                  <div className="single-line-container">
                    <h4>2</h4>
                    <div className="primaryLine-precentage">
                      <div className="primaryLine">
                        <div className="yellowLine" style={{
                          width:`${doctorRatingsFinal.tow}%`
                        }}></div>
                      </div>
                      <h5 className="precentageContainer">
                        {doctorRatingsFinal.tow} %
                      </h5>
                    </div>
                  </div>
                  <div className="single-line-container">
                    <h4>1</h4>
                    <div className="primaryLine-precentage">
                      <div className="primaryLine">
                        <div className="yellowLine" style={{
                          width:`${doctorRatingsFinal.one}%`
                        }}></div>
                      </div>
                      <h5 className="precentageContainer">
                        {doctorRatingsFinal.one} %
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>





            <div className="commentContainer">
              {doctor?.review.map((rev,revIndex)=>{
                return(
                  <CommentComponent key={revIndex} review={rev}/>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}

export default DoctorPage
