import { useNavigate } from 'react-router-dom';
import TitleComponent from '../TitleComponent/TitleComponent'
import './HomeArticle.css'
import ArticleCard from '../ArticleCard/ArticleCard';
import { articlesData } from '../../data/atriclesData';
const HomeArticle = () => {
    const ThreeArticles = articlesData.slice(0,3);

    const navigate = useNavigate();
  return (
    <section className='HomeArticles px-162'>
      <TitleComponent title='المدونات' desc='اقرأ عن اشهر الامراض النفسية واعراضها وبعض طرق العلاج السلوكية' />
      <div className="homeAriclesContainer">
        <div className="articlesMainContainer">
            {
                ThreeArticles.map((dat,index)=>{
                    return(
                        <ArticleCard key={index} desName={dat.title} desImage={dat.img} desTalk={dat.description} categ={dat.categ}/>
                    )
                })
            }
        </div>
        <button className="readMoreButton" onClick={()=>navigate('/articles')}>
            اقرأ باقي المدونات
        </button>
      </div>

    </section>
  )
}

export default HomeArticle
