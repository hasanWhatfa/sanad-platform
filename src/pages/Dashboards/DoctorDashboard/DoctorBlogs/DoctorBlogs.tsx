// DoctorBlogsPage.tsx
import React, { useEffect, useState } from 'react';
import './DoctorBlogs.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { image_base, type Blog, type User } from '../../../../data/generalTypes';



export const DoctorBlogsPage: React.FC = () => {
  const [blogs,setBlogs] = useState<Blog[]>([]);
    const user_data_raw = localStorage.getItem('user_data');
    const user_data = user_data_raw ? JSON.parse(user_data_raw) as User : null;
    const doc_id = user_data?.id;
  const fetchBlogs = (id : number | undefined)=>{
    axios.get(`http://127.0.0.1:8000/api/doctor/blogs/doctor/${id}/view`,{
      headers:{
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then((res)=>{
      setBlogs(res.data.data);
    })
    .catch((err)=>{
      console.log(err.response.message);
    })
    ;
  }
    const navigate = useNavigate();
    useEffect(()=>{
    fetchBlogs(doc_id)
    },[])
  return (
    <div className="doctor-blogs-container">
      <header className="page-header">
        <h1>مدوناتي</h1>
        <button className="add-blog-btn"
        onClick={()=>navigate('add-blog')}>
          + إضافة مدونة جديدة
        </button>
      </header>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <div className="blog-image-wrapper">
              <img src={`${image_base}/${blog.blog_img}`} alt={blog.blog_title} className="blog-image" />
            </div>
            <div className="blog-content">
              <h2>{blog.blog_title}</h2>
              <p className="blog-date">تاريخ النشر: {blog.published_at.slice(0,blog.published_at.indexOf("T"))}</p>
              <div className="blog-actions">
                <button className="edit-btn"
                onClick={()=>navigate(`/doctor-dash/doctor-blogs/edit-blog/${blog.id}`)}>تعديل</button>
                <button className="delete-btn">حذف</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};