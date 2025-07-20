import { useRef, useState, type FormEvent } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import type { AuthData } from "../../data/AuthData";
import InputField from "../../components/InputField/InputField";
import "./Auth.css";
import axios from "axios";

interface LoginFormData {
  formData: AuthData | undefined;
}

const Login = ({ formData }: LoginFormData) => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
// =============put the API here=============
  const base_url : string =''

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


// uncomment to send request
    // axios.post(base_url,{
    //   email:email.current?.value,
    //   password:password.current?.value
    // },{
    //   headers:{
    //     Accept:"Application/json",
    //   }
    // })
    // .then((res)=>{
    //   localStorage.setItem('token',res.data.token)
    // })
    // .catch(err=>console.log(err))
  };

  return (
  <form onSubmit={handleFormSubmited} className="auth_login_form">
    <h3 className="auth_title">{formData?.data.title}</h3>

    <div className="auth_fields_container">
      <InputField ref={email} fieldData={formData?.data.emailField} errorMessage={errors.email}/>
      <InputField ref={password} fieldData={formData?.data.passwordField} errorMessage={errors.password}/>
    </div>

    <div className="auth_submit_section">
      <div className="auth_policy_check">
        <input type="checkbox" id="policy" />
        <label htmlFor="policy">
          أوافق على <span className="highlight">سياسات الخصوصية والأمان</span>
        </label>
      </div>
      <button type="submit" className="auth_submit_btn">
        {formData?.data.btnContent}
      </button>
    </div>

    <p className="auth_switch_link">
      {formData?.data.dontYou.text}
      <span className="auth_switch_action">{formData?.data.dontYou.linkWords}</span>
    </p>
  </form>
  );
};

export default Login;
