import {useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import './EditPatientData.css'
import { image_base, type User } from '../../../../data/generalTypes';
import { MdEdit, MdOutlineDoneOutline } from 'react-icons/md';
import SlideIn from '../../../../layouts/SlideIn';
import PageWrapper from '../../../../components/Root/PageWrapper/PageWrapper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditPatientDataField from './EditPatientDataField';




interface FrontErrorType{
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: string;
  gender?: string;
  password?: string;
  phone_number?: string;
  imgErr?: string;
}


interface apiErrorsObject{
  avatar?:string;
  first_name?:string;
  last_name?:string;
  age?:string;
  gender?:string;
  password?:string;
  phone_number?:string;
  email?:string;
}

const EditPatientData = () => {

  // refs
  const avatar = useRef<HTMLInputElement>(null);
  const first_name = useRef<HTMLInputElement>(null);
  const last_name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const gender = useRef<HTMLSelectElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const phone_number = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);



  const [doneEditing,setDoneEditing] = useState<boolean>(false);
  const [editBtnClicked,setEditBtnClicked] = useState<boolean>(false);
  const [choosedImage,setChoosedImage] = useState<string | null>();
  const [apiErrors,setApiErrors] = useState<apiErrorsObject>({});
  const [frontErrors,setFrontErrors] = useState<FrontErrorType>({})
  const navigate = useNavigate();
  const rawData = localStorage.getItem("user_data");
  const user_data = rawData? JSON.parse(rawData) as User : null;

  const doneEditingHandler = ()=>{
    setDoneEditing(true);
    setTimeout(()=>
      setDoneEditing(false)
    ,3000)
  }
  const clickImpInput =()=>{
    avatar.current?.click();
  }
  const displayChoosenImage = (e:ChangeEvent<HTMLInputElement>)=>{
    const file = e.target?.files?.[0];
    if(file && file.type.startsWith('image/')){
      const url = URL.createObjectURL(file);
      setChoosedImage(url);
    }
    else{
      setChoosedImage(null)
      setFrontErrors({
         ...frontErrors,
        imgErr:'الرجاءاختيار صورة فقط'
      })
    }
  }
  // this is the handler
  const handleEditData =(e:FormEvent)=>{
    e.preventDefault();

    const firstName = first_name.current?.value.trim();
    const lastName = last_name.current?.value.trim();
    const emailField = email.current?.value.trim();
    const ageField = age.current?.value.trim();
    const imgFiled = avatar.current?.files?.[0];
    const passwordField = password.current?.value.trim();
    const genderField = gender.current?.value;
    const phoneNumber = phone_number.current?.value.trim();

    const errors: FrontErrorType = {};

    if (!firstName) errors.firstName = "الاسم الأول لا يمكن أن يكون فارغًا";
    if (!lastName) errors.lastName = "الاسم الثاني لا يمكن أن يكون فارغًا";
    if (!emailField) errors.email = "البريد الالكتروني مطلوب";
    if (!ageField) errors.age = "العمر مطلوب";
    if (!passwordField) errors.password = "كلمة المرور مطلوبة";
    if (!phoneNumber) errors.phone_number = "رقم الهاتف مطلوب";
    if (!genderField) errors.gender = "الرجاء اختيار الجنس";


    if (Object.keys(errors).length > 0) {
      setFrontErrors(errors);
      return;
    }


    const fd = new FormData();

    if (imgFiled) fd.append("avatar", imgFiled || '');
    fd.append("first_name", firstName || "");
    fd.append("last_name", lastName || "");
    fd.append("email", emailField || "");
    fd.append("age", ageField || "");
    fd.append("password", passwordField || "");
    fd.append("gender", genderField || "");
    fd.append("phone_number", phoneNumber || "");

    const base_url :string = 'http://127.0.0.1:8000/api/patient/update'

    axios.post(base_url,fd,{
      headers:{
        Accept:"application/json",
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    }).
    then((res) => {
      doneEditingHandler();
      const newData = res.data.patient;
      localStorage.setItem("user_data",JSON.stringify(newData));
      setTimeout(()=>{navigate('/patient-dash')},3000);
    }).
    catch((err)=>{
        if(err.response?.status === 422) {
          setApiErrors(err.response.data.errors);
        } else {
          alert("حدث خطأ غير متوقع، حاول لاحقًا.");
        }
    })
  }
  return (
    <PageWrapper>
      <main className='Edit_patient_data_page p60'>
        {doneEditing &&
          <p className='done_editing_message'>تم تحديث معلوماتك بنجاح <MdOutlineDoneOutline /></p>
        }
        <form onSubmit={handleEditData} className='edit_patient_data_form'>
          <div className="img_name_container">
            <div className="img_container">
              <img src={choosedImage ? choosedImage : `${image_base}/${user_data?.avatar}`} alt={`${user_data?.first_name}'s photo`} />
              {
                apiErrors.avatar &&
                <p className='error_input'>{apiErrors.avatar}</p>
              }
              <div className="img_overLay">
                <button onClick={clickImpInput}>
                  تعديل الصورة
                </button>
                <input type="file" style={{display:'none'}} ref={avatar} onChange={displayChoosenImage}/>
              </div>
            </div>
            <div className="userName">
              <p className='happy_font'>{user_data?.first_name + " " + user_data?.last_name}</p>
              <div className="icon_container" onClick={()=>setEditBtnClicked((prev)=> !prev)}>
                <MdEdit />
              </div>
            </div>
          </div>
          <div className="inputs_container">
            {
              editBtnClicked &&
              <SlideIn  direction='top' duration={0.6}>
              <div className='inputs_row'>
                <EditPatientDataField 
                label='الاسم الاول'
                name='first_name'
                defaultValue={user_data?.first_name}
                type='text'
                ref={first_name}
                errorMessage={frontErrors.firstName}
                serverError={apiErrors.first_name}
                placeholder='الاسم الاول'
                />
                <EditPatientDataField 
                label='الاسم الثاني'
                name='last_name'
                defaultValue={user_data?.last_name}
                type='text'
                ref={last_name}
                errorMessage={frontErrors.lastName}
                serverError={apiErrors.last_name}
                placeholder='الاسم الثاني'
                />
              </div>
              </SlideIn>
            }
            <div className="inputs_row">
              <EditPatientDataField
              type='number'
              label='العمر'
              name='age'
              defaultValue={user_data?.age}
              ref={age}
              errorMessage={frontErrors.age}
              serverError={apiErrors.age}
              placeholder='العمر'
              />
              <EditPatientDataField 
              type='select'
              options={[
                {label:'ذكر' , value:"ذكر"},
                {label:'انثى' , value:"انثى"}
              ]}
              name='gender'
              label= 'الجنس'
              errorMessage={frontErrors.gender}
              serverError={apiErrors.gender}
              defaultValue={user_data?.gender}
              ref={gender}
              />
            </div>
            <div className="inputs_col">
              <EditPatientDataField
              label='كلمة المرور' 
              name='password'
              type='password'
              errorMessage={frontErrors.password}
              serverError={apiErrors.password}
              defaultValue={user_data?.password}
              ref={password}
              />
              <EditPatientDataField
              label='البريد الالكتروني' 
              name='email'
              type='email'
              errorMessage={frontErrors.email}
              serverError={apiErrors.email}
              defaultValue={user_data?.email}
              ref={email}
              />
              <EditPatientDataField
              label='رقم الهاتف' 
              name='phone_number'
              type='text'
              errorMessage={frontErrors.phone_number}
              serverError={apiErrors.phone_number}
              defaultValue={user_data?.phone_number}
              ref={phone_number}
              />
            </div>
            <button className='submitBtn happy_font' type='submit'>تأكيد</button>
          </div>
        </form>
      </main>
    </PageWrapper>

  )
}
export default EditPatientData
