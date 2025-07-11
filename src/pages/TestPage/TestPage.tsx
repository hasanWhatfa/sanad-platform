import { Link, useParams } from "react-router-dom"
import './TestPage.css'
import { testsData } from "../../data/PsychTest";
import { motion } from "framer-motion";
import PageWrapper from "../../components/Root/PageWrapper/PageWrapper";
import SlideIn from "../../layouts/SlideIn";
import { RiMentalHealthFill } from "react-icons/ri";
const TestPage = () => {
    const params = useParams();
    const {id} = params;
    const testData = testsData.find((test)=>test.id == id);
  return (
    <PageWrapper>
      <main className={`TestPage ${id}`}>
        <section className="testPage_hero px-162">
          {/* <img src={testData.testImage} alt={testData.hook} /> */}
          <motion.div className="testPage_hero_text"
          initial={{opacity:0,x:40}}
          animate={{opacity:1,x:0}}
          transition={{duration:1,ease:'easeOut',delay:0.8}}
          >
            <h2>{testData?.testTitleQuestion}</h2>
            <p>{testData?.testQuestionDesc}</p>
          </motion.div>
        </section>
        <section className="testPage_content px-162">
            <SlideIn direction="top" delay={0.3} duration={0.8}>
              <div className="testStart_container">
                <div className="testStart_title">
                  <h2>{testData?.testTitle}</h2>
                  <p>{testData?.hook}</p>
                </div>
                <div className="testStart_talk_about">
                  {testData?.aboutDisorder.map((para,paraIndex)=>{
                    return(
                      <p key={paraIndex}><span>{paraIndex + 1}-</span>{para}</p>
                    )
                  })}
                </div>
                <div className="testStart_Start">
                  <p>*{testData?.testSentence}</p>
                  <div className="start_btn_container">
                    <img src="/icons/roundedArrow.png" className="rouded-arow"/>
                    <img src="/public/icons/roundedArrowCurvy.png" className="rounded-arow-curvy"/>
                    <Link to={`/questionsPage/${testData?.id}`} className="testStart_button">
                      ابدا اختبار {testData?.testName}
                      <RiMentalHealthFill />
                    </Link>
                  </div>

                </div>
              </div>
            </SlideIn>
        </section>
      </main>
    </PageWrapper>
  )
}

export default TestPage
