import ArticleCard from "../../components/ArticleCard/ArticleCard"
import { articlesData } from "../../data/atriclesData"
import sliceArray from "../../components/SliceArr"
import './Articles.css'
import { useEffect, useMemo, useState } from "react"
import { CiSearch } from "react-icons/ci"
import PaganationControl from "../../components/PaganationControl/PaganationControl"
import TopPostComponent from "../../components/TopPostComponent/TopPostComponent"
import TopArariclesComponent from "../../components/TopArariclesComponent/TopArariclesComponent"
import PageWrapper from "../../components/Root/PageWrapper/PageWrapper"


// تابع لتوحيد التصنيفات
const mapCategory = (cat: string): string => {
  if (["اضطرابات عصبية", "أمراض دماغية"].includes(cat)) return "اضطرابات عصبية ودماغية"
  if (["لغة الجسد", "مهارات شخصية", "التواصل"].includes(cat)) return "مهارات التواصل والشخصية"
  if (["اكتئاب", "قلق", "نوبات هلع", "اضطرابات نفسية", "علاج نفسي", "وصمة مجتمعية"].includes(cat)) return "اضطرابات نفسية وعلاجها"
  if (["إدمان", "دعم نفسي", "تعافي", "تطوير الذات"].includes(cat)) return "الإدمان والدعم النفسي"
  if (["علاقات", "الأسرة"].includes(cat)) return "العلاقات الأسرية والاجتماعية"
  if (["الصحة النفسية"].includes(cat)) return "الصحة النفسية"
  if (["تثقيف صحي"].includes(cat)) return "تثقيف صحي"
  return cat
}
const unifiedCategories = [
  "اضطرابات عصبية ودماغية",
  "مهارات التواصل والشخصية",
  "اضطرابات نفسية وعلاجها",
  "الإدمان",
  "الدعم النفسي",
  "العلاقات الأسرية والاجتماعية",
  "الصحة النفسية",
  "تثقيف صحي"
];
const Articles = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const pageSize = 6

  const [disabledBtns, setDisabledBtns] = useState<{ nextBtn: boolean; prevBtn: boolean }>({
    nextBtn: false,
    prevBtn: false
  })
  // فلترة المقالات حسب البحث والتصنيف معًا
  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const matchSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase().trim())

      const matchCategory =
        !selectedCategory ||
        article.categ.some((cat) => mapCategory(cat) === selectedCategory)

      return matchSearch && matchCategory
    })
  }, [searchTerm, selectedCategory])
  const articlesGroups = useMemo(() => sliceArray(filteredArticles, pageSize), [filteredArticles])
  const displayedGroup = articlesGroups[currentIndex] || []
  const topArticles = articlesData.slice(6, 11)
  const handleNextPage = () => {
    const idx = Math.min(currentIndex + 1, articlesGroups.length - 1)
    setCurrentIndex(idx)
    setDisabledBtns({
      nextBtn: idx === articlesGroups.length - 1,
      prevBtn: idx === 0
    })
  }
  const handlePrevPage = () => {
    const idx = Math.max(0, currentIndex - 1)
    setCurrentIndex(idx)
    setDisabledBtns({
      nextBtn: idx === articlesGroups.length - 1,
      prevBtn: idx === 0
    })
  }
  // إعادة ضبط الصفحة عند تغيير البحث أو التصنيف
  useEffect(() => {
    setCurrentIndex(0)
  }, [searchTerm, selectedCategory])

  return (
    <PageWrapper>
      <main className="ArticlesPage px-162">
        <div className="newThing">
          {/* المحتوى الرئيسي */}
          <div className="articlesContainer">
            <div className="cardsContainer">
              {displayedGroup.map((item, index) => (
                <ArticleCard
                  key={index}
                  categ={item.categ}
                  desImage={item.img}
                  desName={item.title}
                  desTalk={item.description}
                  id={item.id}
                />
              ))}
            </div>

            <div className="paganation-controls">
              <PaganationControl
                className={`flex-row-reverse ${disabledBtns.nextBtn ? "disabledBtn" : ""}`}
                onClick={handleNextPage}
              >
                <img src="/icons/arrow-right.svg" alt="الصفحة التالية" />
                <p>الصفحة التالية</p>
              </PaganationControl>

              <div className="numbers-container">
                {articlesGroups.map((_, groupIndex) => (
                  <PaganationControl
                    key={groupIndex}
                    className={`${groupIndex === currentIndex ? "activeTab" : ""}`}
                    onClick={() => setCurrentIndex(groupIndex)}
                  >
                    <p>{groupIndex + 1}</p>
                  </PaganationControl>
                ))}
              </div>

              <PaganationControl
                className={`${disabledBtns.prevBtn ? "disabledBtn" : ""}`}
                onClick={handlePrevPage}
              >
                <img src="/icons/arrow-left.svg" alt="الصفحة السابقة" />
                <p>الصفحة السابقة</p>
              </PaganationControl>
            </div>
          </div>

          {/* الشريط الجانبي */}
          <div className="leftSideNav">
            {/* البحث */}
            <div className="serachBox">
              <input
                type="text"
                placeholder="ابحث عن مقال معين.."
                dir="rtl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CiSearch />
            </div>
            {/* التصنيفات */}
            <div className="categorize-container">
              <h3>التصنيفات</h3>
              <ul>
                {unifiedCategories.map((cat) => (
                  <li
                    key={cat}
                    className={cat === selectedCategory ? "activeCategory" : ""}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </li>
                ))}
                {selectedCategory && (
                  <li className="resetCategory" onClick={() => setSelectedCategory(null)}>
                    عرض الكل
                  </li>
                )}
              </ul>
            </div>
            <TopArariclesComponent arrayOfObject={topArticles} heading="أفضل المقالات"/>
            {/* الصور */}
            <div className="imgs-container">
              <h3>صور</h3>
              <div className="container">
                <img src="/images/docPhoto3.jpg" />
                <img src="/images/manStanding2.jpg" />
                <img src="/images/woman3.jpg" />
                <img src="/images/social phobia.jfif" />
                <img src="/images/ثنائي القطب.jfif" />
                <img src="/images/heroImage3.jpg" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}

export default Articles
