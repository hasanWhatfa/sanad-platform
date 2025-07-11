import React from "react";

interface Props {
  name: string;
  job: string;
  testimonial: string;
  image: string;
  rating: number;
}

const TestimonialCard: React.FC<Props> = ({ name, job, testimonial, image, rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "#FFD700" : "#ddd"}}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="testimonial-slide">
      <img src={image || "/images/default-user.webp"} alt={`صورة ${name}`} />
      <h3 className="testimonial-name">{name}</h3>
      <h4 className="testimonial-job">{job}</h4>
      <div className="testimonial-text">"{testimonial}"</div>
      <div className="testimonial-rating">{renderStars()}</div>
    </div>
  );
};

export default TestimonialCard;
