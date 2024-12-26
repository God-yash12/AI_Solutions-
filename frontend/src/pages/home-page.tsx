import UserReviewsForm from "../components/form/user-reviews-form"
import Home from "../components/landing-pages/home/home"
import Review from "../components/landing-pages/reviews/reviews"

const LandingPage = () => {
  return (
    <div className="m-10">
      <UserReviewsForm />
      <Review />
      <Home />
    </div>
  )
}

export default LandingPage
