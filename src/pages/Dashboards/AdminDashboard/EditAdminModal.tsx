import React, { useState,type ChangeEvent,type FormEvent } from 'react';
import './EditAdminModal.css';
import { image_base, type User } from '../../../data/generalTypes';
import axios from 'axios';

    const user_data_raw = localStorage.getItem('user_data');
    const user_data = user_data_raw ? JSON.parse(user_data_raw) as User : null;

  const adminData = {
    first_name: user_data?.first_name,
    last_name:user_data?.last_name,
    avatar: `${image_base}/${user_data?.avatar}`, 
    email:user_data?.email
  };

interface EditAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({ isOpen, onClose }) => {
  const [errorMessage,setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    first_name: adminData.first_name ?? "",
    last_name: adminData.last_name ?? "",
    email: adminData.email ?? "",
    password: "",
    password_confirmation: "",
    avatar: adminData.avatar ?? "", // للعرض فقط
    avatarFile: null as File | null, // 👈 الملف الأصلي
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result as string, // لعرض الصورة
          avatarFile: file, // 👈 نخزن الملف هنا
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("first_name", formData.first_name);
    fd.append("last_name", formData.last_name);
    fd.append("email", formData.email);
    fd.append("password", formData.password);
    fd.append("password_confirmation", formData.password_confirmation);

    if (formData.avatarFile) {
      fd.append("avatar", formData.avatarFile); // 👈 الملف نفسه مش Base64
    }

    console.log("بيانات المسؤول المحدثة:", formData);

    axios.post("http://127.0.0.1:8000/api/admin/profile/update", fd, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data", // مهم 👈
      },
    })
    .then((res) => {
      console.log(res);
      onClose();
      localStorage.setItem("user_data",JSON.stringify(res.data.user))
    })
    .catch((err) => {
      setErrorMessage(err.response?.data?.message || err.message);
      
    });
  };
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>تعديل بيانات المسؤول</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </header>
        {errorMessage &&
        <p className='errorMessage'>{errorMessage}</p>
        }
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="avatar-section">
            <div className="avatar-preview-wrap">
              <img src={formData.avatar} alt="صورة المسؤول" className="avatar-preview" />
            </div>
            <label className="file-input-label">
              اختيار صورة جديدة
              <input type="file" onChange={handleAvatarChange} accept="image/*" className="file-input-hidden" />
            </label>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">الاسم الأول</label>
              <input 
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">الاسم الأخير</label>
              <input 
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <input 
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <input 
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation">تأكيد كلمة المرور</label>
            <input 
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              إلغاء
            </button>
            <button type="submit" className="btn-primary">
              تحديث
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminModal;