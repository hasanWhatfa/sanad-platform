import { useState } from "react";
import "./PatientRate.css";
import axios from "axios";

interface AddCommentModalProps {
  openModalSetter: React.Dispatch<React.SetStateAction<boolean>>;
  choosenDoctor: number | undefined;
  choosenDoctorName: string | undefined;
}

const AddCommentModal = ({
  openModalSetter,
  choosenDoctorName,
  choosenDoctor,
}: AddCommentModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(""); // بدال doneMessage و err
  const [isError, setIsError] = useState<boolean>(false);

  const base_url: string = "http://127.0.0.1:8000/api/patient/ratings/add";
  const isFormValid = rating > 0 && comment.trim().length > 0;

  const handleSubmit = async () => {
    setTouched(true);
    if (!isFormValid) return;

    try {
      const res = await axios.post(
        base_url,
        {
          doctor_id: choosenDoctor,
          rate: rating,
          comment: comment,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMessage(res.data.message);
      setIsError(false);
    } catch (error: any) {
      console.error(error);
      setMessage(
        error?.response?.data?.message ||
          "حدث خطأ غير متوقع، حاول مرة أخرى لاحقاً"
      );
      setIsError(true);
    } finally {
      setTimeout(() => {
        setMessage("");
        openModalSetter(false);
      }, 2000);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {message && (
          <p className={isError ? "ratedBefore" : "doneMessage"}>{message}</p>
        )}

        <h3 className="modal-title">إضافة تقييم</h3>
        <p className="modal-subtitle">للطبيب: {choosenDoctorName}</p>

        {/* النجوم */}
        <div className="stars-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? "active" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>
        {touched && rating === 0 && (
          <p className="error-text">الرجاء اختيار عدد النجوم</p>
        )}

        {/* التعليق */}
        <textarea
          className="comment-input"
          placeholder="اكتب رأيك هنا..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {touched && comment.trim().length === 0 && (
          <p className="error-text">الرجاء كتابة تعليق</p>
        )}

        {/* الأزرار */}
        <div className="modal-actions">
          <button className="btn cancel" onClick={() => openModalSetter(false)}>
            إلغاء
          </button>
          <button className="btn submit" onClick={handleSubmit}>
            إرسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCommentModal;
