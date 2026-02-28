// Articles.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Articles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { image_base } from '../../data/generalTypes';
import { Link } from 'react-router-dom';

// تعريف الواجهات (Interfaces)
export interface DoctorMainType {
  user_id?: number;
  id?: number;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  specialization?: string;
  role?: 'doctor';
}

export interface BlogSection {
  id: number;
  blog_id: number;
  section_title: string;
  section_text: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: number;
  blog_title: string;
  blog_img: string;
  author: DoctorMainType;
  published_at: string;
  sections: BlogSection[];
}

const API_URL = 'http://127.0.0.1:8000/api/blogs/all';

export const Articles: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // جلب البيانات من الـ API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<{ data: Blog[] }>(API_URL);
        const fetchedBlogs = response.data.data;
        setBlogs(fetchedBlogs);
        setFilteredBlogs(fetchedBlogs);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('فشل في جلب المقالات. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // منطق البحث
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const result = blogs.filter((blog) => {
      const titleMatch = blog.blog_title.toLowerCase().includes(term);
      const authorMatch = `${blog.author?.first_name} ${blog.author?.last_name}`.toLowerCase().includes(term);
      const contentMatch = blog.sections.some((section) => section.section_text.toLowerCase().includes(term));
      return titleMatch || authorMatch || contentMatch;
    });
    setFilteredBlogs(result);
  }, [searchTerm, blogs]);

  if (loading) {
    return <div className="loading-state">جاري تحميل المقالات...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }
  
  // عرض المقالات المميزة في Swiper
  const featuredBlogs = blogs.slice(0, 5);

  return (
    <div className="articles-page-container">
      <header className="articles-header">
        <h1>مقالاتنا الطبية</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="البحث حسب العنوان، الطبيب، أو المحتوى..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </header>

      {/* قسم المقالات المميزة باستخدام Swiper.js */}
      <section className="featured-articles">
        <h2>أحدث المقالات</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {featuredBlogs.map((blog) => (
            <SwiperSlide key={blog.id}>
              <div className="swiper-slide-content">
                <img src={`${image_base}/${blog.blog_img}`} alt={blog.blog_title} className="swiper-image" />
                <div className="swiper-text">
                  <h3>{blog.blog_title}</h3>
                  <p>
                    بقلم: د. {blog.author?.first_name} {blog.author?.last_name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* قسم جميع المقالات */}
      <section className="all-articles">
        <h2>كل المقالات</h2>
        {filteredBlogs.length > 0 ? (
          <div className="articles-grid">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="article-card">
                <div className="card-image-wrapper">
                  <img src={`${image_base}/${blog.blog_img}`} alt={blog.blog_title} className="article-image" />
                </div>
                <div className="card-content">
                  <h3 className="article-title">{blog.blog_title}</h3>
                  <p className="article-author">
                    بقلم: د. {blog.author?.first_name} {blog.author?.last_name}
                  </p>
                  <p className="article-date">نشر بتاريخ: {blog.published_at.split('T')[0]}</p>
                  <p className="article-summary">
                    {blog.sections[0]?.section_text.substring(0, 100)}...
                  </p>
                  <Link to={`/article/${blog.id}`} className="read-more-btn">
                    اقرأ المزيد
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>لا توجد مقالات تطابق معايير البحث.</p>
          </div>
        )}
      </section>
    </div>
  );
};