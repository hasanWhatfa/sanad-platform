import axios from "axios";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import { SlCloudUpload } from "react-icons/sl";
// import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import type { AuthData } from "../../data/AuthData";
import "./Auth.css";
interface SignupFormData {
  formData: AuthData | undefined;
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

const Signup = ({ formData }: SignupFormData) => {
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

  const [image, setImage] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayImage = (e: ChangeEvent<any>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImage(url);
    } else {
      setImage(null);
    }
  };

  const clickInput = () => {
    profile_image.current?.click();
  };

  // const navigate = useNavigate();

  // ===========================put the API here==============================
  const base_url: string = "http://127.0.0.1:8000/api/register";

  // data you will receive in backend.
  const data = {
    first_name: first_name.current?.value,
    last_name: last_name.current?.value,
    gender: gender.current?.value,
    age: age.current?.value,
    email: email_field.current?.value,
    password: password.current?.value,
    password_confirmation: confirm_password.current?.value,
    avatar: profile_image.current?.files?.[0],
  };

  // headers
  const headers = {
    Accept: "Application/json",
    "Content-Type": "multipart/form-data",
  };

  //==== send SignUp request Function=====
  const handleFormSubmited = (e: FormEvent) => {
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
    const fd = new FormData();
    fd.append("first_name", data.first_name || "");
    fd.append("last_name", data.last_name || "");
    fd.append("email", data.email || "");
    fd.append("password", data.password || "");
    fd.append("password_confirmation", data.password_confirmation || "");
    fd.append("avatar", data.avatar || "");
    fd.append("age", data.age || "");
    fd.append("gender", data.gender || "");
    fd.append("phone_number", "0987654321");
    // ================ uncomment this code to send request, and uncomment the variables above(base_url,data,headers).
    // erros accepted from the request aren't proccessed.

    axios
      .post(base_url, fd, { headers })
      .then((res) => {
        // edit here to store the token in the localStorage
        // localStorage.setItem("token", res.data.data.token);
        console.log(res.data); //رح ببعتلك الناتج بصورة
        // navigate("/patientDash");
      })
      .catch((err) => {
        if (err.response?.status === 422) {
          // setErrors(err.response.data.errors); //this is validation errors from backend
        } else {
          alert("حدث خطأ غير متوقع، حاول لاحقًا.");
        }
      });
  };

  return (
    <form className="auth_form signUp_form" onSubmit={handleFormSubmited}>
      <div className="square">
        <div className="topCon">
          <div className="titleContainer">
            <h3 className="form_title">{formData?.data.title}</h3>
            <FaUser />
          </div>
          <div className="form_logo_container">
            <img
              src="/public/icons/logo3.png"
              alt="logo"
              className="sign-up-form-logo"
            />
          </div>
        </div>
        <p className="dontYouP">
          {formData?.data.dontYou.text}
          <span>{formData?.data.dontYou.linkWords}</span>
        </p>
      </div>
      <div className="square">
        <div className="fieldes_container">
          <div className="nameContainer">
            <InputField
              ref={first_name}
              fieldData={formData?.data.firstName}
              errorMessage={formErrors.first_name}
            />
            {/* {errors.email && (
          <span style={{ color: "red" }}>{errors.email[0]}</span>
        )} */}
            <InputField
              fieldData={formData?.data.laseName}
              ref={last_name}
              errorMessage={formErrors.last_name}
            />
            {/* {errors.email && (
          <span style={{ color: "red" }}>{errors.last_name[0]}</span>
        )} */}
          </div>
          <div className="gender_age">
            <InputField
              ref={gender}
              fieldData={formData?.data.gender}
              errorMessage={formErrors.gender}
            />
            <InputField
              ref={age}
              fieldData={formData?.data.ageField}
              errorMessage={formErrors.age}
            />
          </div>
          <InputField
            ref={email_field}
            fieldData={formData?.data.emailField}
            errorMessage={formErrors.email}
          />
          <div className="image_field">
            <p>الصورة الشخصية(اختياري)</p>
            <div className="image_container" onClick={clickInput}>
              <input
                type="file"
                style={{ display: "none" }}
                ref={profile_image}
                onChange={displayImage}
              />
              {image ? (
                <img
                  src={image}
                  alt="profile image"
                  className="profile_image"
                />
              ) : (
                <SlCloudUpload />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="square logo_and_policy">
        <InputField
          ref={password}
          fieldData={formData?.data.passwordField}
          errorMessage={formErrors.password}
        />
        <InputField
          ref={confirm_password}
          fieldData={formData?.data.confirmPass}
          errorMessage={formErrors.confirm_password}
        />
        <div className="submit_btn">
          <div className="privacy_policy">
            <input type="checkbox" />
            <p>
              اوفق على <span>سياسات الخصوصية والأمان</span>
            </p>
          </div>
          <button type="submit">{formData?.data.btnContent}</button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
