import { useState } from "react";
import { plansData } from "../../../../data/plansData";
import "./PatientPlans.css";
// NEW: Import useNavigate to redirect the user after subscribing
import { useNavigate } from "react-router-dom";
import type { User } from "../../../../data/generalTypes";
  
const getStartOfWeek = (date: Date): string => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff)).toISOString().split('T')[0];
};

export default function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState("");
  // NEW: Initialize the navigate function
  const navigate = useNavigate();
  const user_data_raw = localStorage.getItem('user_data');
  const user_data = user_data_raw ? JSON.parse(user_data_raw) as User : null;
  const user_id = user_data?.id;
  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
    setCardNumber("");
    setError("");
  };

  const handleClose = () => {
    setSelectedPlan(null);
  };

  // NEW: Updated submit logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{11}$/.test(cardNumber)) {
      setError("رقم البطاقة يجب أن يحتوي على 11 رقمًا فقط");
      return;
    }

    const userId = user_id;
    if (!userId) {
        alert("Could not verify user. Please log in again.");
        return;
    }

    // NEW: Define session limits for each plan. Adjust names to match your plansData
    // I'm assuming the plan names are 'hope', 'happiness', and 'satisfaction'
    const planLimits: { [key: string]: number } = {
        "باقة الأمل": 1,         // Hope Plan
        "باقة السعادة": 2,      // Happiness Plan
        "باقة الرضا": 3         // Satisfaction Plan
    };

    // NEW: Create the plan object to store
    const planData = {
        planName: selectedPlan,
        sessionsPerWeek: planLimits[selectedPlan!] || 1, // Default to 1 if name doesn't match
        sessionsUsed: 0,
        weekStartDate: getStartOfWeek(new Date())
    };

    // NEW: Create unique keys and save to localStorage
    const planKey = `user_plan_${userId}`;
    const cardKey = `user_card_${userId}`;
    
    localStorage.setItem(planKey, JSON.stringify(planData));
    localStorage.setItem(cardKey, cardNumber);

    alert(`✅ تم الاشتراك في ${selectedPlan} بنجاح!`);
    
    // NEW: Navigate user back to the sessions page to continue
    navigate('/patient-dash/my-sessions');
  };

  return (
    // ... (Your JSX remains unchanged)
    <div className="plans-container">
      <h1 className="plans-title">اختر الباقة المناسبة لك</h1>
      <div className="plans-grid">
        {plansData.map((plan) => (
          <div className="plan-card" key={plan.name}>
            <div className="plan-icon">{plan.planIcon}</div>
            <h2 className="plan-name">{plan.name}</h2>
            <p className="plan-price">{plan.price} $ / {plan.paymentMethod}</p>
            <ul className="plan-features">
              {plan.featuers.map((f, i) => (
                <li
                  key={i}
                  className={f.available ? "available" : "not-available"}
                >
                  {f.featName}
                </li>
              ))}
            </ul>
            <button
              className="plan-btn"
              onClick={() => handleSubscribe(plan.name)}
            >
              اشترك الآن
            </button>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>إدخال بيانات الدفع</h2>
            <p>الاشتراك في: <strong>{selectedPlan}</strong></p>
            <form onSubmit={handleSubmit}>
              <label>
                رقم البطاقة:
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={11}
                  placeholder="***********"
                />
              </label>
              {error && <p className="error">{error}</p>}
              <div className="modal-actions">
                <button type="submit" className="confirm-btn">تأكيد</button>
                <button type="button" onClick={handleClose} className="cancel-btn">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}