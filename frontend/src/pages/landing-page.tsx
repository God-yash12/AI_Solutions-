import AboutUsLandingPage from "../components/landing-pages/about/about"
import CompanyPortfolio from "../components/landing-pages/company-portfolio/company-portfolio"
import Home from "../components/landing-pages/home/home"
import ReviewAndRatings from "../components/landing-pages/reviews/reviews"
import ServiceInfoCard from "../components/landing-pages/services/service-info-card"

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Home />
        <AboutUsLandingPage />
        <ServiceInfoCard />
      </div>
      <div>
        <CompanyPortfolio />
        <ReviewAndRatings />
      </div>
    </div>
  )
}

export default LandingPage
