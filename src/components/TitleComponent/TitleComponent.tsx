import './TitleComponent.css'
import SplitText from '../SplitText/SplitText';
interface TitleComponentProps{
  title:string;
  desc:string;
}
const TitleComponent = ({title,desc} : TitleComponentProps) => {
  const handleAnimationComplete = () => {
  console.log('All letters have animated!');
  };
  return (
    <div className='titleComponent'>
      <div className="logoContainer">
        <img src="/icons/logo1.png" alt="logo" className='logo' />
      </div>
      <div className='titleHeader'>
      <svg className="scribble" viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 20 C 30 5, 70 30, 100 20 S 170 5, 195 20" />
      </svg>
        <h3>{title}</h3>
        <SplitText
          text={desc}
          className="ltr-dir"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
          />
      </div>
    </div>
  )
}
export default TitleComponent
