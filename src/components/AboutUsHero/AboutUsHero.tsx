import './AboutUsHero.css'
interface AboutUsHeroProps{
  title:string;
  talk:string;
  img:string;
}
const AboutUsHero = ({title,talk,img} : AboutUsHeroProps) => {
  return (
    <section className='AboutUsHero px-162'>
        <div className="aboutUsHeroImageContainer">
            <img src={img} alt="image" />
        </div>
      <div className="aboutUsheroText">
        <h3>
          {title}
        </h3>
        <p>
          {talk}
        </p>
      </div>
    </section>
  )
}

export default AboutUsHero
