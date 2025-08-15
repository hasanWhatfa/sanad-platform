import { useRef, useState, type FormEvent } from "react";
// import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import InputField from "../../components/InputField/InputField";
import type { AuthData } from "../../data/AuthData";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  formData: AuthData | undefined;
}

type frontEndErrors = {
  email?:string;
  password?:string;
}

type serverErrorMessage = {
  email?:string;
  password?:string; 
}

const Login = ({ formData }: LoginFormData) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<frontEndErrors>({});
  const [apiErrors,setApiErrors] = useState<serverErrorMessage>();
  const navigate = useNavigate();
  const [loading,setLoading] = useState<boolean>(false);
    const checkRole = (role : string)=>{
      switch(role){
        case 'patient':
        navigate('/patient-dash')
        break;

        case 'doctor' : 
        navigate('/doctor-dash')
        break;

        default:
          navigate('/admin-dash')
      }
    }

  // =============put the API here=============
  const base_url: string = "http://127.0.0.1:8000/api/login";

  const handleFormSubmited = (e: FormEvent) => {
    e.preventDefault();

    // data validation
    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";

    const newErrors: { email?: string; password?: string } = {};
    if (!emailValue.trim()) {
      newErrors.email = "الرجاء إدخال البريد الإلكتروني";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
    }

    if (!passwordValue.trim()) {
      newErrors.password = "الرجاء إدخال كلمة المرور";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true)
    // uncomment to send request
    axios
      .post(
        base_url,
        {
          email: email.current?.value,
          password: password.current?.value,
        },
        {
          headers: {
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        checkRole(res.data.user.role);
        localStorage.setItem("user_data",JSON.stringify(res.data.user));
      })
      .catch((err) => setApiErrors(err.response.data.errors))
      .finally(()=>setLoading(false))
  };

  return (
    <form onSubmit={handleFormSubmited} className="auth_login_form">
      <h3 className="auth_title">{formData?.data.title}</h3>

      <div className="auth_fields_container">
        <InputField
          ref={email}
          fieldData={formData?.data.emailField}
          errorMessage={errors.email}
          serverErrorMessage={apiErrors?.email}
        />
        <InputField
          ref={password}
          fieldData={formData?.data.passwordField}
          errorMessage={errors.password}
          serverErrorMessage={apiErrors?.password}
        />
      </div>

      <div className="auth_submit_section">
        <div className="auth_policy_check">
          <input type="checkbox" id="policy" />
          <label htmlFor="policy">
            أوافق على <span className="highlight">سياسات الخصوصية والأمان</span>
          </label>
        </div>
        <button type="submit" className="auth_submit_btn"
        disabled={loading}>
         {loading ? '......' : formData?.data.btnContent}
        </button>
      </div>

      <p className="auth_switch_link">
        {formData?.data.dontYou.text}
        <span className="auth_switch_action">
          {formData?.data.dontYou.linkWords}
        </span>
      </p>
    </form>
  );
};

export default Login;
