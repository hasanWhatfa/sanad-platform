import { Outlet } from "react-router-dom"
import AboutNav from "../../components/AboutNav/AboutNav"
import SubHero from "../../components/SubHero/SubHero"
import PageWrapper from "../../components/Root/PageWrapper/PageWrapper"

const About = () => {
  return (
    <PageWrapper>
      <SubHero />
      <AboutNav />
      <Outlet />
    </PageWrapper>
  )
}

export default About
