// AddBlogModal.tsx
import React, { useState } from 'react';
import './AddBlogModal.css';

interface AddBlogModalProps {
  onClose: () => void;
}

export const AddBlogModal: React.FC<AddBlogModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يتم إرسال البيانات إلى API
    console.log('بيانات المدونة:', { title, content, imageFile });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">إضافة مدونة جديدة</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="blog-title">عنوان المدونة</label>
            <input
              id="blog-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
              placeholder="اكتب عنوانًا جذابًا للمدونة"
            />
          </div>
          <div className="form-group">
            <label htmlFor="blog-content">محتوى المدونة</label>
            <textarea
              id="blog-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="form-textarea"
              placeholder="اكتب محتوى المدونة هنا..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="blog-image">صورة المدونة</label>
            <input
              id="blog-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              نشر المدونة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};