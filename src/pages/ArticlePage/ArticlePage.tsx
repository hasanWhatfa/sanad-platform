import { Link, useParams } from "react-router-dom"
import { articlesData } from "../../data/atriclesData";
import './ArticlePage.css';
import ArticlesYouMayLike from "../../components/ArticlesYouMayLike/ArticlesYouMayLike";
import { TfiHandPointLeft } from "react-icons/tfi";
import PageWrapper from "../../components/Root/PageWrapper/PageWrapper";


const ArticlePage = () => {
  const params = useParams();
  const {id} = params;
  const article = articlesData.find((artcile)=>artcile.id == id);
  const similarArticles = articlesData.filter((arti)=>{
    return arti.categ.some((cat)=>article?.categ.includes(cat));
  })
  return (
    <PageWrapper>
      <main className="ArticlePageComponent px-162">

        <section className="Article_content">
          <div className="top_content">
            <div className="img_container">
              <img src={article?.img} />
            </div>
            <div className="top_text">
              <h2>{article?.title}</h2>
              <p>{article?.description}</p>
            </div>
          </div>

          <div className="bottomContent">
            {
              article?.sections.map((sec,idx)=>{
                return(
                  <div className="articleSection" key={idx}>
                    <h3>{sec.heading}</h3>
                    <p>{sec.content}</p>
                  </div>
                )
              })
            }
          </div>
          <div className="articelsYouMayLike">
            <ArticlesYouMayLike />
          </div>
        </section>


        <div className="right_banner">
          <div className="categoryShow">
            <h3>التصنيف</h3>
            <div className="cateContainer">
              {article?.categ.map((cat,idx)=>{
                return(
                  <p key={idx}>{cat}</p>
                )
              })}
            </div>
          </div>
          <div className="similarArticles">
            <h3>مقالات مشابهة</h3>
            <div className="similar_articles_container">
              {
                similarArticles.map((article,idx)=>{
                  return(
                    <div className="similarArticle_card" key={idx}>
                      <div className="svg-conteia">
                        <TfiHandPointLeft />
                      </div>
                      <div className="blablaTEXT">
                        <h4><Link to={`/article/${article.id}`}>{article.title}</Link></h4>
                        <p>{article.description}</p>
                      </div>
                    </div>          
                  )
                })
              }
            </div>
          </div>
          <div className="joinUsInvite">
            <h3>هل تعاني من مشكلة في هذا الموضوع؟</h3>
            <button>
              ابدا علاجك الاّن
            </button>
          </div>
        </div>
      </main>
    </PageWrapper>
  )
}

export default ArticlePage
