// EditDoctorInfoModal.tsx

import React, { useState, useEffect } from 'react';
import './ModalAdvancedStyling.css'
import Modal from './PopUpGem'; 
import FormInput from './FormInput';

// Icons
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCamera } from 'react-icons/fa';
import axios from 'axios';
import { image_base } from '../../../data/generalTypes';

interface UserforModal {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
}

interface EditDoctorInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserforModal; 
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EditDoctorInfoModal: React.FC<EditDoctorInfoModalProps> = ({ isOpen, onClose, currentUser }) => {
  // Use plain strings (avoid undefined in controlled inputs)
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Errors map
  const [errors, setErrors] = useState<Record<string, string>>({});

  // populate form when modal opens (use empty string fallback)
  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName ?? '');
      setLastName(currentUser.lastName ?? '');
      setEmail(currentUser.email ?? '');
      setAvatarPreview(currentUser.avatar ?? '');
      // reset passwords & errors when opening
      setPassword('');
      setConfirmPassword('');
      setErrors({});
      setAvatarFile(null);
    }
  }, [currentUser, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      // clear avatar related error if any
      setErrors(prev => {
        const copy = { ...prev };
        delete copy.avatar;
        return copy;
      });
    }
  };

  // helper to clear field-specific error and set value
  const handleFieldChange = (field: string, value: string) => {
    switch (field) {
      case 'firstName': setFirstName(value); break;
      case 'lastName': setLastName(value); break;
      case 'email': setEmail(value); break;
      case 'password': setPassword(value); break;
      case 'confirmPassword': setConfirmPassword(value); break;
    }
    // remove the error for this field as user types
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[field];
      // also if password changed, remove confirmPassword error
      if (field === 'password') delete copy.confirmPassword;
      return copy;
    });
  };

  // validate single field (useful onBlur)
  const validateField = (field: string) => {
    const newErrors: Record<string, string> = {};
    if (field === 'firstName') {
      if (!firstName.trim()) newErrors.firstName = 'الاسم الأول مطلوب';
    }
    if (field === 'lastName') {
      if (!lastName.trim()) newErrors.lastName = 'الاسم الأخير مطلوب';
    }
    if (field === 'email') {
      if (!email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
      else if (!EMAIL_REGEX.test(email)) newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }
    if (field === 'password') {
      if (password && password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    if (field === 'confirmPassword') {
      if (password && confirmPassword !== password) newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // full validation on submit
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = 'الاسم الأول مطلوب';
    if (!lastName.trim()) newErrors.lastName = 'الاسم الأخير مطلوب';

    if (!email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    else if (!EMAIL_REGEX.test(email)) newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة';

    // Password section: only validate when user provided a new password
    if (password) {
      if (password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
      if (confirmPassword !== password) newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';
    } else {
      // If confirmPassword has value but password empty -> show hint
      if (confirmPassword) newErrors.confirmPassword = 'أدخل كلمة المرور أولاً';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // scroll to first error (nice UX)
  const focusFirstError = () => {
    const firstKey = Object.keys(errors)[0];
    if (!firstKey) return;
    const el = document.getElementById(firstKey);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      // wait a tick to update DOM then focus
      setTimeout(() => focusFirstError(), 50);
      return;
    }
    setIsSaving(true);

    // Build payload
      const fd = new FormData();
      fd.append('first_name',firstName.trim());
      fd.append("last_name",lastName.trim());
      fd.append("email", email.trim());
      if(password) fd.append("password",password.trim());
      if(avatarFile)fd.append("avatar",avatarFile);
      console.log(fd.values());
    const base_url:string ='http://127.0.0.1:8000/api/doctor/update';

    axios.post(base_url,fd,{
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="تعديل الملف الشخصي">
      <form onSubmit={handleSubmit} className="edit-doctor-form" noValidate>
        
        <div className="avatar-upload-section">
          <div className="avatar-preview-wrapper">
            {avatarPreview ? (
              <img src={`${image_base}/${avatarPreview}`} alt="الصورة الشخصية" className="avatar-preview" />
            ) : (
              <div className="avatar-placeholder" aria-hidden>
                {/* optional placeholder content */}
                <FaUser size={32} />
              </div>
            )}

            <label htmlFor="avatarUpload" className="avatar-edit-button" aria-label="تعديل الصورة">
              <FaCamera />
            </label>
            <input 
              type="file" 
              id="avatarUpload" 
              accept="image/*" 
              onChange={handleImageChange}
              aria-label="رفع الصورة"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="field-wrapper">
            <FormInput
              id="firstName"
              label="الاسم الأول"
              type="text"
              icon={<FaUser />}
              value={firstName}
              onChange={(e) => handleFieldChange('firstName', e.target.value)}
              onBlur={() => validateField('firstName')}
              required
            />
            {errors.firstName && <span className="error-text" id="firstName">{errors.firstName}</span>}
          </div>

          <div className="field-wrapper">
            <FormInput
              id="lastName"
              label="الاسم الأخير"
              type="text"
              icon={<FaUser />}
              value={lastName}
              onChange={(e) => handleFieldChange('lastName', e.target.value)}
              onBlur={() => validateField('lastName')}
              required
            />
            {errors.lastName && <span className="error-text" id="lastName">{errors.lastName}</span>}
          </div>
        </div>

        <div className="field-wrapper">
          <FormInput
            id="email"
            label="البريد الإلكتروني"
            type="email"
            icon={<FaEnvelope />}
            value={email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={() => validateField('email')}
            required
          />
          {errors.email && <span className="error-text" id="email">{errors.email}</span>}
        </div>

        <p className="password-section-title">تغيير كلمة المرور (اتركه فارغاً لعدم التغيير)</p>
        
        <div className="password-wrapper field-wrapper">
          <FormInput
            id="password"
            label="كلمة المرور الجديدة"
            type={showPassword ? "text" : "password"}
            icon={<FaLock />}
            value={password}
            onChange={(e) => handleFieldChange('password', e.target.value)}
            onBlur={() => validateField('password')}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <span className="error-text" id="password">{errors.password}</span>}
        </div>

        <div className="password-wrapper field-wrapper">
          <FormInput
            id="confirmPassword"
            label="تأكيد كلمة المرور"
            type={showConfirmPassword ? "text" : "password"}
            icon={<FaLock />}
            value={confirmPassword}
            onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
            onBlur={() => validateField('confirmPassword')}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "إخفاء تأكيد كلمة المرور" : "إظهار تأكيد كلمة المرور"}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.confirmPassword && <span className="error-text" id="confirmPassword">{errors.confirmPassword}</span>}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose} disabled={isSaving}>
            إلغاء
          </button>
          <button type="submit" className="btn-primary" disabled={isSaving}>
            {isSaving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditDoctorInfoModal;
