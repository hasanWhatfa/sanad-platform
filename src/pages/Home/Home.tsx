import FAQ from "../../components/FAQ/FAQ"
import Footer from "../../components/Footer/Footer"
import HomeArticle from "../../components/HomeArticle/HomeArticle"
import MainHero from "../../components/MainHero/MainHero"
import Plans from "../../components/Plans/Plans"
import Testimonials from "../../components/Testimonials/Testimonials"
import WhySanad from "../../components/WhySanad/WhySanad"
import WorkTeam from "../../components/WorkTeam/WorkTeam"
import YouWay from "../../components/YouWay/YouWay"
import PageWrapper from "../../components/Root/PageWrapper/PageWrapper"
const Home = () => {
  return (
    <PageWrapper>
      <MainHero />
      <YouWay />
      <WhySanad />
      <WorkTeam />
      <Plans />
      <FAQ />
      <Testimonials />
      <HomeArticle/>
    </PageWrapper>
  )
}

export default Home
