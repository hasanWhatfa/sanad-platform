// AboutUsHero.tsx
import "./AboutUsHero.css";
import { FaHandshake, FaRegSmile, FaLeaf } from "react-icons/fa";

interface AboutUsHeroProps {
  title: string;
  talk: string;
  img: string;
}

const AboutUsHero = ({ title, talk, img }: AboutUsHeroProps) => {
  return (
    <section className="aboutUsHero px-162">
      {/* Background icons */}
      <div className="hero-bg-icons">
        <FaHandshake className="bg-icon icon1" />
        <FaRegSmile className="bg-icon icon2" />
        <FaLeaf className="bg-icon icon3" />
      </div>

      <div className="aboutUsHeroContent">
        <div className="aboutUsHeroImageContainer">
          <img src={img} alt="About Us" />
        </div>
        <div className="aboutUsHeroText">
          <h1>{title}</h1>
          <p>{talk}</p>
          <button className="hero-btn">اعرف المزيد</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
