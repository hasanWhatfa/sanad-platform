import {type TestResult } from "../../../../data/generalTypes"
import './PatientDetails.css'
import './DoctorPatiens.css'
type TestReslutSectionProps = {
    testResult:TestResult;
}



const TestReslutSection = ({testResult} : TestReslutSectionProps) => {
  return (
      <section className="test_result_section">
        <h2>{testResult.test_name}</h2>
        <div className="test_progress">
          <div className="circle">
            <span>{testResult.result}%</span>
          </div>
          <p className="description">{testResult.result_description}</p>
        </div>
        <table className="answers_table">
          <thead>
            <tr>
              <th>السؤال</th>
              <th>الإجابة</th>
            </tr>
          </thead>
          <tbody>
            {testResult?.answers.map((a, i) => {
              // نحصل على المفتاح والقيمة من كل object
              const question = Object.keys(a)[0];
              const answer = a[question];

              return (
                <tr key={i}>
                  <td>{question}</td>
                  <td>{answer}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
  )
}

export default TestReslutSection
