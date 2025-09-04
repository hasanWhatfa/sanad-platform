// DoctorBlogsPage.tsx
import React, { useState } from 'react';
import './DoctorBlogs.css';
import { AddBlogModal } from './AddBlogModal';

// بيانات وهمية
const mockBlogs = [
  {
    id: 1,
    title: 'نصائح للحفاظ على صحة القلب',
    date: '2023-09-01',
    image: 'https://via.placeholder.com/300x200?text=صحة+القلب',
  },
  {
    id: 2,
    title: 'أهمية النوم الجيد لصحة العقل',
    date: '2023-08-25',
    image: 'https://via.placeholder.com/300x200?text=النوم+والعقل',
  },
  {
    id: 3,
    title: 'نظام غذائي متوازن لمكافحة السكري',
    date: '2023-08-10',
    image: 'https://via.placeholder.com/300x200?text=السكري',
  },
];

export const DoctorBlogsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="doctor-blogs-container">
      <header className="page-header">
        <h1>مدوناتي</h1>
        <button className="add-blog-btn" onClick={handleOpenModal}>
          + إضافة مدونة جديدة
        </button>
      </header>

      <div className="blogs-grid">
        {mockBlogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <div className="blog-image-wrapper">
              <img src={blog.image} alt={blog.title} className="blog-image" />
            </div>
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <p className="blog-date">تاريخ النشر: {blog.date}</p>
              <div className="blog-actions">
                <button className="edit-btn">تعديل</button>
                <button className="delete-btn">حذف</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <AddBlogModal onClose={handleCloseModal} />}
    </div>
  );
};