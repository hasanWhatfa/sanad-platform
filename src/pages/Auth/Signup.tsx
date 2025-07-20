import { useRef, useState, type ChangeEvent, type FormEvent } from "react"
import InputField from "../../components/InputField/InputField"
import type { AuthData } from "../../data/AuthData"
import { SlCloudUpload } from "react-icons/sl";
import './Auth.css'
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface SignupFormData {
    formData: AuthData | undefined
}

type FormErrors = {
  first_name?: string;
  last_name?: string;
  gender?: string;
  age?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
};

const Signup = ({formData} :SignupFormData) => {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  // refs for inputs
  const first_name = useRef<HTMLInputElement>(null);
  const last_name = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email_field = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirm_password = useRef<HTMLInputElement>(null);
  const profile_image = useRef<HTMLInputElement>(null);

  const [image,setImage] = useState<string | null>(null);

  const displayImage =(e:ChangeEvent<any>)=>{
    const file = e.target.files?.[0];
      if(file && file.type.startsWith('image/')){
      const url = URL.createObjectURL(file);
      setImage(url);
    }
    else{
      setImage(null);
    }
  }

  const clickInput=()=>{
    profile_image.current?.click();
  };

  // const navigate = useNavigate();

//===========================put the API here==============================
  // const base_url : string= '';

  // data you will receive in backend.
  // const data ={
  //     first_name:first_name.current?.value,
  //     last_name:last_name.current?.value,
  //     gender:gender.current?.value,
  //     age:age.current?.value,
  //     email_field:email_field.current?.value,
  //     password:password.current?.value,
  //     confirm_password:confirm_password.current?.value,
  //     profile_image:profile_image.current?.files?.[0]
  // }

  // headers
  // const headers ={
  //     Accept:"Application/json",
  //     "Content-Type" :  "multipart/form-data"
  // }


  //==== send SignUp request Function=====
  const handleFormSubmited =(e:FormEvent)=>{
    e.preventDefault();
    // validating data before sending
  const errors: FormErrors = {};
  const firstName = first_name.current?.value?.trim();
  const lastName = last_name.current?.value?.trim();
  const genderVal = gender.current?.value?.trim();
  const ageVal = age.current?.value?.trim();
  const email = email_field.current?.value?.trim();
  const pass = password.current?.value;
  const confirmPass = confirm_password.current?.value;
  if (!firstName) errors.first_name = "الاسم الأول مطلوب";
  if (!lastName) errors.last_name = "الاسم الأخير مطلوب";
  if (!genderVal) errors.gender = "النوع مطلوب";
  if (!ageVal) errors.age = "العمر مطلوب";
  if (!email) errors.email = "البريد الإلكتروني مطلوب";
  if (!pass) errors.password = "كلمة المرور مطلوبة";
  if (!confirmPass) errors.confirm_password = "تأكيد كلمة المرور مطلوب";
  if (ageVal && isNaN(Number(ageVal))) {
    errors.age = "العمر يجب أن يكون رقمًا";
  }
  if (pass && confirmPass && pass !== confirmPass) {
    errors.confirm_password = "كلمة المرور وتأكيدها غير متطابقين";
  }
  setFormErrors(errors);
  if (Object.keys(errors).length > 0) {
    console.log("الأخطاء:", errors);
    return;
  }

// ================ uncomment this code to send request, and uncomment the variables above(base_url,data,headers).
// erros accepted from the request aren't proccessed.

    // axios.post(base_url,data,{headers})
    // .then((res)=>{
    //   // edit here to store the token in the localStorage
    //   localStorage.setItem("token",res.data.data.token);
    //   navigate('/patientDash');
    // })
    // .catch((err)=>console.log(err));
  }

  return (
    <form className="auth_form signUp_form" onSubmit={handleFormSubmited}>
      <div className="square">
        <div className="topCon">
          <div className="titleContainer">
              <h3 className="form_title">{formData?.data.title}</h3>
              <FaUser />
          </div>
          <div className="form_logo_container">
            <img src="/public/icons/logo3.png" alt="logo" className="sign-up-form-logo"/>
          </div>
        </div>
        <p className="dontYouP">{formData?.data.dontYou.text}<span>{formData?.data.dontYou.linkWords}</span></p>
      </div>
      <div className="square">
        <div className="fieldes_container">
          <div className="nameContainer">
            <InputField ref={first_name} fieldData={formData?.data.firstName} errorMessage={formErrors.first_name}/>
            <InputField fieldData={formData?.data.laseName} ref={last_name} errorMessage={formErrors.last_name} />
          </div>
          <div className="gender_age">
            <InputField ref={gender} fieldData={formData?.data.gender} errorMessage={formErrors.gender}/>
            <InputField ref={age} fieldData={formData?.data.ageField} errorMessage={formErrors.age}/>
          </div>
          <InputField ref={email_field} fieldData={formData?.data.emailField} errorMessage={formErrors.email}/>
            <div className="image_field">
              <p>الصورة الشخصية(اختياري)</p>
              <div className="image_container"  onClick={clickInput}>
                <input type="file" style={{display:'none'}} ref={profile_image} onChange={displayImage}/>
                {image ? <img src={image} alt="profile image" className="profile_image"/> : <SlCloudUpload />}
              </div>
          </div>
        </div>
      </div>


      <div className="square logo_and_policy">
        <InputField ref={password} fieldData={formData?.data.passwordField} errorMessage={formErrors.password}/>
        <InputField ref={confirm_password} fieldData={formData?.data.confirmPass} errorMessage={formErrors.confirm_password}/>
        <div className="submit_btn">
          <div className="privacy_policy">
            <input type="checkbox" />
            <p>اوفق على <span>سياسات الخصوصية والأمان</span></p>
          </div>
          <button type="submit">{formData?.data.btnContent}</button>
        </div>
      </div>

    </form>
  )
}

export default Signup
