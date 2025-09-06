import React, { useState,type FormEvent,type ChangeEvent } from "react";
import "./AddBlog.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog: React.FC = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImg, setBlogImg] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [firstSectionTitle, setFirstSectionTitle] = useState("");
  const [firstSectionText, setFirstSectionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBlogImg(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  };
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!blogImg) {
    setMessage("❌ الرجاء اختيار صورة للمقال.");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const formData = new FormData();
    formData.append("blog_title", blogTitle);
    formData.append("blog_img", blogImg);
    formData.append("first_section_title", firstSectionTitle);
    formData.append("first_section_text", firstSectionText);

    const res = await axios.post(
      "http://127.0.0.1:8000/api/doctor/blogs/add",
      formData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setMessage(`✅ ${res.data.message}`);
    setTimeout(()=>{
    navigate(`/doctor-dash/doctor-blogs/edit-blog/${res.data.blog.id}`)
    },2000)
  } catch (error) {
    setMessage("❌ حدث خطأ أثناء إنشاء المقال.");
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="add-blog-container">
      <h2 className="page-title">إضافة مقال جديد</h2>
      <form className="add-blog-form" onSubmit={handleSubmit}>
        <label>
          عنوان المقال
          <input
            type="text"
            value={blogTitle}
            onChange={(e) => setBlogTitle(e.target.value)}
            required
          />
        </label>

        <label>
          صورة المقال
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        </label>

        {previewImg && (
          <div className="image-preview">
            <p>معاينة الصورة:</p>
            <img src={previewImg} alt="معاينة" />
          </div>
        )}

        <label>
          عنوان القسم الأول
          <input
            type="text"
            value={firstSectionTitle}
            onChange={(e) => setFirstSectionTitle(e.target.value)}
            required
          />
        </label>

        <label>
          نص القسم الأول
          <textarea
            value={firstSectionText}
            onChange={(e) => setFirstSectionText(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "جارٍ الإنشاء..." : "إنشاء المقال"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddBlog;
