// ArticlePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArticlePage.css';
import { image_base } from '../../data/generalTypes';
import { RxArrowTopLeft } from 'react-icons/rx';

// Interfaces remain the same
export interface DoctorMainType {
  user_id?: number;
  id?: number;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  achievements?: string;
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

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndFindBlog = async () => {
      try {
        setLoading(true);
        // Fetch all blogs
        const response = await axios.get<{ data: Blog[] }>(API_URL);
        const allBlogs = response.data.data;
        
        // Find the specific blog by its ID
        const foundBlog = allBlogs.find(b => String(b.id) === id);

        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError('المقال المطلوب غير موجود.');
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError('فشل في جلب المقالات. يرجى المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    };

    fetchAndFindBlog();
  }, [id]); // This effect will run only once when the component mounts or if the ID in the URL changes

  // Conditional rendering for different states
  if (loading) {
    return <div className="loading-state">جاري تحميل المقال...</div>;
  }

  if (error || !blog) {
    return <div className="error-state">{error || 'المقال غير موجود.'}</div>;
  }

  // Destructure blog data after confirming it exists
  const { blog_title, blog_img, author, published_at, sections } = blog;
  
  const authorName = `د. ${author?.first_name} ${author?.last_name}`;
  const publishDate = new Date(published_at).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const doctorAchivments = blog.author.achievements?.split(',');
  console.log(doctorAchivments)
  return (
    <div className="article-page-container">
      {/* Article Header */}
      <header className="article-header" style={{ backgroundImage: `url(${image_base}/${blog_img})` }}>
        <div className="header-overlay">
          <h1 className="article-title">{blog_title}</h1>
          <div className="author-info-header">
            <span className="author-name">{authorName}</span>
            <span className="separator">|</span>
            <span className="publish-date">تاريخ النشر: {publishDate}</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="article-content-wrapper">
        <article className="article-body">
          {sections.map((section: BlogSection) => (
            <div key={section.id} className="article-section">
              <h2 className="section-title">{section.section_title}</h2>
              <p className="section-text">{section.section_text}</p>
            </div>
          ))}
        </article>

        {/* Author Details */}
        <aside className="author-details">
          <div className="author-card">
            <img src={`${image_base}/${author?.avatar}`} alt={authorName} className="author-avatar" />
            <div className="author-text">
              <h3 className="author-name-card">بقلم: {authorName}</h3>
              <p className="author-specialization">{author?.specialization}</p>
              <div className="author-achievements">{doctorAchivments?.map((achiv,idx)=>{
                return(
                  <p key={idx} className='achiv_PlaPLoPALI'>< RxArrowTopLeft /> {achiv}</p>
                )
              })}</div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};