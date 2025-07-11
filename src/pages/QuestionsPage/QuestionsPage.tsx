import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { type PsychTestOption, testsData } from "../../data/PsychTest";
import { type PsychTest } from "../../data/PsychTest";
import './QuestionsPage.css';
import { HiH2 } from "react-icons/hi2";

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
  const progress = ((currentIndex + (showEndBtn ? 1 : 0)) / test!.questions.length) * 100;
  // handle when the user chooses an answer
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
        <div className="question_page_innerContent">
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
                        onClick={()=>setShowResult(true)}>end the test and get resulte</button>
                    }
                    </motion.div>
                ):(
                    <ResultComponent answers={answers}/>
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
}
const ResultComponent : React.FC<ResulteProps> =({answers})=>{
    return(
        <HiH2 />
    )
}