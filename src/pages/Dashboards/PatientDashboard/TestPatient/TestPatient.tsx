import "./TestPatient.css";
import { testCardData } from "../../../../data/testCardsData";
import TestCard from "./TestCard";

const TestPatient = () => {

  return (
    <div className="test-page">
      <h1 className="page-title">الاختبارات النفسية</h1>
      <div className="tests-grid">
        {testCardData.map((card,idx)=>{
          return(
            <TestCard key={idx} description={card.description}  title={card.title} name_id={card.name_id}
            id={card.id}/>
          )
        })}
      </div>
    </div>
  );
};

export default TestPatient;
