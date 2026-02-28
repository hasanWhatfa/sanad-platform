// ContactUs.tsx
import React from "react";
import "./ContactUs.css";

const ContactUs: React.FC = () => {
  return (
    <div className="contact-container">
      {/* Left: Contact Form */}
      <div className="contact-form-section">
        <h2>تواصل معنا</h2>
        <p className="form-desc">
          نحن هنا لدعمك دائمًا. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.
        </p>
        <form className="contact-form">
          <input type="text" placeholder="الاسم الكامل" required />
          <input type="email" placeholder="البريد الإلكتروني" required />
          <textarea placeholder="اكتب رسالتك هنا..." rows={5} required />
          <button type="submit">إرسال</button>
        </form>
      </div>

      {/* Right: Contact Info */}
      <div className="contact-info-section">
        <h2>معلومات التواصل</h2>
        <ul className="contact-info-list">
          <li><strong>الهاتف 1:</strong> <a href="tel:+123456789">0999 234 239</a></li>
          <li><strong>الهاتف 2:</strong> <a href="tel:+987654321">0940 660 323</a></li>
          <li>
            <strong>واتساب:</strong> 
            <a href="https://wa.me/123456789" target="_blank" rel="noreferrer">
              تحدث معنا مباشرة
            </a>
          </li>
          <li><strong>البريد:</strong> <a href="mailto:support@sanad.com">support@sanad.com</a></li>
          <li><strong>ساعات العمل:</strong> الأحد - الخميس (9 صباحًا - 6 مساءً)</li>
        </ul>

        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">🌐 فيسبوك</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">🐦 تويتر</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">📸 انستغرام</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">💼 لينكدإن</a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
