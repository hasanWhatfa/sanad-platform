import { useParams } from 'react-router-dom'
import './DoctorPage.css'
import CommentComponent from '../../components/CommentComponent/CommentComponent';
import { IoCheckmarkDone } from "react-icons/io5";
import PageWrapper from '../../components/Root/PageWrapper/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../redux/store';
import { image_base, type DoctorMainType, type RateResponse } from '../../data/generalTypes';
import { useEffect, useMemo, useState } from 'react';
import { fetchDox } from '../../redux/slices/PubDoctors';
import axios from 'axios';

const DoctorPage = () => {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);

  const dispatch = useDispatch<AppDispatch>();
  const { doctorsPub, loadingDoctors, errors } = useSelector((state: RootState) => state.doctorsPub);

  const [rates, setRates] = useState<RateResponse[]>([]);
  const [loadingRates, setLoadingRates] = useState(false);
  const [errorRates, setErrorRates] = useState<string | null>(null);

  const doctor: DoctorMainType | undefined = doctorsPub.find((doc) => doc.id === numId);

  // Fetch ratings for this doctor
  const fetchRates = async (docId: string | undefined) => {
    if (!docId) return;
    try {
      setLoadingRates(true);
      const base_url = `http://127.0.0.1:8000/api/doctor/${docId}/ratings`;
      const res = await axios.get(base_url);
      setRates(res.data.data);
    } catch (err) {
      setErrorRates("Failed to load ratings");
      console.error(err);
    } finally {
      setLoadingRates(false);
    }
  };

  useEffect(() => {
    dispatch(fetchDox());
    fetchRates(id);
  }, [dispatch, id]);

  // --- Ratings Calculation ---
  const ratingsSummary = useMemo(() => {
    if (rates.length === 0) return { one: 0, two: 0, three: 0, four: 0, five: 0 };

    const counts = { one: 0, two: 0, three: 0, four: 0, five: 0 };

    rates.forEach((r) => {
      if (r.rate === 5) counts.five++;
      else if (r.rate === 4) counts.four++;
      else if (r.rate === 3) counts.three++;
      else if (r.rate === 2) counts.two++;
      else counts.one++;
    });

    return {
      one: (counts.one / rates.length) * 100,
      two: (counts.two / rates.length) * 100,
      three: (counts.three / rates.length) * 100,
      four: (counts.four / rates.length) * 100,
      five: (counts.five / rates.length) * 100,
    };
  }, [rates]);

  // Average rating for stars
  const averageRating = useMemo(() => {
    if (rates.length === 0) return 0;
    const total = rates.reduce((sum, r) => sum + r.rate, 0);
    return total / rates.length;
  }, [rates]);

  return (
    <PageWrapper>
      <main className="DoctorPage px-162">
        {/* Loading/Error */}
        {loadingDoctors && <p>Loading doctor info...</p>}
        {errors && <p>Error loading doctors</p>}
        {!doctor && !loadingDoctors && <p>Doctor not found</p>}

        {doctor && (
          <>
            {/* Doctor Info */}
            <div className="DoctorInfo-one">
              <div className="img-cont">
                <img src={`${image_base}/${doctor.avatar}`} alt="doctor" />
              </div>
              <div className="name-cont">
                <h3>{doctor.first_name + ' ' + doctor.last_name}</h3>
                <p>{doctor.specialization}</p>
              </div>
            </div>

            <div className="DoctorInfo-two">
              <h3>نبذة تعريفية عن الطبيب:</h3>
              <p>{doctor.specialization ?? "لا توجد نبذة متاحة"}</p>
            </div>

            <div className="DoctorInfo-three">
              <h3>الانجازات و العضويات:</h3>
              <ul className="DoctorAchivments">
                {doctor.achievements?.split(",").map((achiv, idx) => (
                  <li key={idx}><IoCheckmarkDone /> {achiv.trim()}</li>
                ))}
              </ul>
            </div>

            {/* Ratings & Comments */}
            <div className="DoctorInfo-four">
              <h3>التعليقات و التقييمات:</h3>
              <div className="everyThingContainer">

                {/* Ratings Summary */}
                <div className="rating-main-container">
                  <div className="starsDisplay">
                    <div className="stars-container">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ color: i < Math.round(averageRating) ? "gold" : "#ccc" }}>★</span>
                      ))}
                    </div>
                    <small>{averageRating.toFixed(1)} / 5 ({rates.length} تقييم)</small>
                  </div>

                  <div className="ratesThing">
                    {([5,4,3,2,1] as const).map((num) => (
                      <div className="single-line-container" key={num}>
                        <h4>{num}</h4>
                        <div className="primaryLine-precentage">
                          <div className="primaryLine">
                            <div className="yellowLine" style={{
                              width: `${ratingsSummary[num === 5 ? "five" : num === 4 ? "four" : num === 3 ? "three" : num === 2 ? "two" : "one"]}%`
                            }}></div>
                          </div>
                          <h5 className="precentageContainer">
                            {ratingsSummary[num === 5 ? "five" : num === 4 ? "four" : num === 3 ? "three" : num === 2 ? "two" : "one"].toFixed(1)}%
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div className="commentContainer">
                  {loadingRates && <p>Loading ratings...</p>}
                  {errorRates && <p>{errorRates}</p>}
                  {!loadingRates && rates.length === 0 && <p>لا توجد تعليقات بعد</p>}
                  {rates.map((rev, idx) => (
                    <CommentComponent key={idx} review={rev} />
                  ))}
                </div>

              </div>
            </div>
          </>
        )}
      </main>
    </PageWrapper>
  );
};

export default DoctorPage;
