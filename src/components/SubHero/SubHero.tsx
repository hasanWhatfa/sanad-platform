// SubHero.tsx
import "./SubHero.css";
import { FaUserMd, FaHeartbeat, FaHandsHelping } from "react-icons/fa";

const SubHero = () => {
  return (
    <section className="subHero">
      {/* Background icons */}
      <div className="subHero-bg-icons">
        <FaUserMd className="sub-bg-icon icon1" />
        <FaHeartbeat className="sub-bg-icon icon2" />
        <FaHandsHelping className="sub-bg-icon icon3" />
      </div>

      <div className="subHeroTextHeading">
        <h2>من نحن</h2>
        <p>تعرف على نظرتنا، الأطباء والمختصين، والمزيد عنا</p>
      </div>
    </section>
  );
};

export default SubHero;
