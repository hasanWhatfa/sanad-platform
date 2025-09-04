import "./Modal.css";
import { type TestResult } from "./TestCard";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: TestResult | null;
  onRetake: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data, onRetake }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <h2>{data.test_name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="result-section">
            <span className="result-value">{data.result}%</span>
            <p className="result-description">{data.result_description}</p>
          </div>

          <div className="answers-table">
            <table>
              <thead>
                <tr>
                  <th>السؤال</th>
                  <th>إجابة المريض</th>
                </tr>
              </thead>
              <tbody>
                {data.answers.map((a, idx) => {
                  const [question, answer] = Object.entries(a)[0]; // استخراج السؤال والجواب
                  return (
                    <tr key={idx}>
                      <td>{question}</td>
                      <td>{answer}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="test-date">
            أُجري بتاريخ:{" "}
            {new Date(data.created_at).toLocaleDateString("ar-EG")}
          </p>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="retake-btn" onClick={onRetake}>إعادة الاختبار</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
