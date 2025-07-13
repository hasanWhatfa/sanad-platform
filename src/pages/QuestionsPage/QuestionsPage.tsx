import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {testsData } from "../../data/PsychTest";
import { type PsychTest } from "../../data/PsychTest";
import './QuestionsPage.css';


interface Answer {
  questionId: number;
  score: number;
}

const QuestionsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const test = testsData.find((t) => t.id.toString() === id);
  // state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showEndBtn,setShowEndBtn] = useState<boolean>(false);
  const [showProgress,setShowProgress] = useState<boolean>(true);
  const progress = ((currentIndex + (showEndBtn ? 1 : 0)) / test!.questions.length) * 100;
  // handle when the user chooses an answer, update the state by adding the quesId and the score of the answer he choosed
  const handleAnswered = (questionId: number, score: number) => {
    setAnswers((prev) => [...prev, { questionId, score }]);

    if (currentIndex < (test?.questions.length ?? 0) - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowEndBtn(true);
    }
  };

  // guard clauses
  if (!test) {
    return <div>الاختبار غير موجود</div>;
  }

  return (
    <div
      className="QuestionPage px-162"
      style={{
        backgroundImage: `url(${test.testImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="overlayBlack"></div>
      <div className="question_page_content">
        <div className={`question_page_innerContent ${showResult ? "result_shown" : ''}`}>
            { showProgress &&
              <div className="progress_bar_wrapper">
            <div className="progress_text">
                السؤال {currentIndex + 1} من {test.questions.length}
            </div>
            <div className="progress_bar_bg">
                <div
                className="progress_bar_fill"
                style={{ width: `${progress}%` }}
                ></div>
            </div>
            </div>
            }
            <AnimatePresence mode="wait">
                { !showResult ? 
                    (
                    <motion.div
                    style={{width:'100%'}}
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    >
                        <QuestionComponent
                        question={test.questions[currentIndex]}
                        handleAnswered={handleAnswered}
                        />
                    {
                        showEndBtn && 
                        <button
                        onClick={()=>{setShowResult(true);setShowProgress(false)}} className="end_test">انهي الاختبار</button>
                    }
                    </motion.div>
                ):(
                    <ResultComponent 
                      answers={answers}
                      currentTest={test}
                    />
                )
                }
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;

interface QuestionShapeProps {
  question: PsychTest["questions"][0];
  handleAnswered: (questionId: number, score: number) => void;
}

const QuestionComponent: React.FC<QuestionShapeProps> = ({ question, handleAnswered }) => {
  const [selected, setSelected] = useState<number | null>(null);

  const onSelect = (score: number) => {
    setSelected(score);
    handleAnswered(question.questId, score);
  };

  return (
    <div className="question">
        <div className="question_Text">
            <h3>{question.questionText}</h3>
            <p>({question.questionDesc})</p>
        </div>
        <div className="options_container">
            {question.options.map((opt, idx) => {
            const inputId = `q${question.questId}-opt${idx}`;
            return (
                <div className="one_option" key={inputId}>
                <input
                    type="radio"
                    id={inputId}
                    name={`q-${question.questId}`}
                    checked={selected === opt.score}
                    onChange={() => onSelect(opt.score)}
                />
                <label htmlFor={inputId}>{opt.optionText}</label>
                </div>
            );
            })}
        </div>
    </div>
  );
};

interface ResulteProps{
    answers:Answer[];
    currentTest:PsychTest;
}

const ResultComponent = ({answers,currentTest}:ResulteProps)=>{

  // this function will calculate the sum of score that the user choosed.

  const calcResult = (answers : Answer[]) : number =>answers.reduce((sum,answer)=> sum + answer.score,0);

  // calculate the maximum result that could come from the test.
  const maxScoreFromTest = currentTest.questions.reduce((acc, q) => {
    const maxScorePerQuestion = Math.max(...q.options.map(opt => opt.score));
    return acc + maxScorePerQuestion;
  }, 0);

  // calculate user's result:
  const rs : number = calcResult(answers);
  const userResult = (rs / maxScoreFromTest) * 100;
  const roundedResult = Math.round(userResult);

  const userLevel = currentTest.resultLevels?.find((level) =>
    roundedResult >= level.min && roundedResult <= level.max
  );

  console.log(`userLevel is : \n ${userLevel}`);
  return(
    <div className="ShowTestResult">
      <div className="result_title_container">
        <h2>نتيجتك في اختبار <span className="test_name">{currentTest?.testName}</span>:</h2>
      </div>
      <div className="result_container_number">
        <img src={userLevel?.emoji} alt="result image" />
        <p>{roundedResult}%</p>
      </div>
      <div className="label_and_talk">
        <h3>{userLevel?.label}</h3>
        <p>{userLevel?.description}</p>
      </div>


      <div className="tips_main_containe">
        <h3>بعض النصائح للتخفيف من المشكلة:</h3>
        <div className="tips_container">
          {
            userLevel?.tips.map((tip)=>{
              return(
                <div className="tip_container" key={tip.id}>
                  <h4>{tip.id}-{tip.title}</h4>
                  <p>{tip.message}</p>
                  <div>
                    {tip.messageTips.map((msg,idx)=>{
                      return(
                        <p key={idx} className="tip_message">-{msg}</p>
                      )
                    })}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="cta_container">
        <p>{userLevel?.hook}</p>
        <button>احجز موعدا الاّن</button>
      </div>
    </div>
  )
}