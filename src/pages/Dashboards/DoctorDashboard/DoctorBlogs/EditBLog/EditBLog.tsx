import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { image_base, type Blog, type BlogSection } from "../../../../../data/generalTypes";
import "./EditBlog.css";

const EditBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>();
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionText, setSectionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fetchBlogData = (id: string | undefined) => {
    if (!id) return;
    const base_url = `http://127.0.0.1:8000/api/doctor/blogs/${id}/sections/get`;
    axios
      .get(base_url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setBlog(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBlogData(id);
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!sectionTitle || !sectionText) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/api/doctor/blogs/${id}/sections/add`,
        {
          
          section_title: sectionTitle,
          section_text: sectionText,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newSection : BlogSection = {
        blog_id:Date.now(),
        created_at:String(Date.now()),
        id:Date.now(),
        section_text:res.data.section_text,
        section_title:res.data.section_title,
        updated_at:"someTIme"
      }
      fetchBlogData(id);
      setMessage("✅ تم إضافة القسم بنجاح");
      setSectionTitle("");
      setSectionText("");
    } catch (error) {
      console.error(error);
      setMessage("❌ حدث خطأ أثناء إضافة القسم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-blog-container" dir="rtl">
      {blog ? (
        <>
          <h2 className="blog-title">{blog.blog_title}</h2>
          <p className="blog-author">
            ✍️ الكاتب: {blog.author.first_name} {blog.author.last_name}
          </p>
          <p className="blog-date">📅 {blog.published_at.slice(0,blog.published_at.indexOf('T'))}</p>
          <img
            src={`${image_base}/${blog.blog_img}`}
            alt="صورة المقال"
            className="blog-image"
          />

          <h3 className="sections-header">الأقسام الحالية:</h3>
          <ul className="sections-list">
            {blog.sections.map((section) => (
              <li key={section?.id} className="section-item">
                <h4>{section?.section_title}</h4>
                <p>{section?.section_text}</p>
              </li>
            ))}
          </ul>

          <form className="add-section-form" onSubmit={handleSubmit}>
            <label>
              عنوان القسم:
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                required
              />
            </label>

            <label>
              نص القسم:
              <textarea
                value={sectionText}
                onChange={(e) => setSectionText(e.target.value)}
                required
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "⏳ جارٍ الإضافة..." : "➕ إضافة القسم"}
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </>
      ) : (
        <p>⏳ جارٍ تحميل بيانات المقال...</p>
      )}
    </div>
  );
};

export default EditBlog;
