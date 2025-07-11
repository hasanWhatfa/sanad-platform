import './FAQ.css'
import faqData from '../../data/faqItem'
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import TitleComponent from '../TitleComponent/TitleComponent';
import { FaSearch } from 'react-icons/fa';
import SlideIn from '../../layouts/SlideIn';
const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
  const toggleFAQ = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  const filteredFAQs = faqData.filter((faq) =>
  faq.question.toLowerCase().includes(searchQuery.toLowerCase().trim())
);
  return (
    <section className="faq-section px-162">
      <TitleComponent title='الاسئلة الشائعة' desc='اختر السؤال الذي تبحث عن اجابة له'/>
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="ابحث عن سؤال..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="faq-list">
        {filteredFAQs.map((item, index) => (
          <SlideIn direction='bottom' delay={0.1} duration={0.5} key={index} once>  
            <div key={item.id} className={`faq-item ${activeIndex === index ? "active" : ""}`}>
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{item.question}</span>
                <FaChevronDown className="icon" />
              </button>
              <div
                className="faq-answer-wrapper"
                style={{
                  maxHeight: activeIndex === index ? "500px" : "0",
                }}
              >
                <div className="faq-answer">
                  {item.answer}
                </div>
              </div>
            </div>
          </SlideIn>
        ))}
      </div>
    </section>
  )
}

export default FAQ
