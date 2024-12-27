
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLoginFormPage from "./pages/login-page";
import AdminDashboardPage from "./pages/dashboard-page";
import EventPage from "./pages/event-page";
import AdminLayout from "./components/layout/admin-layout";
import BlogPage from "./pages/blog-page";
import InquiryPage from "./pages/inquiry-page";
import { ToastContainer } from "react-toastify";
import { RequireAuth } from "./auth/require-auth";
import EventLists from "./components/dashboard/events/event-lists";
import EventDetails from "./components/landing-pages/event/event-details";
import PersistLogin from "./auth/persist-login";
import UserReviewsPage from "./pages/user-reviews";
import BloglistAdmin from "./components/dashboard/blog/blog-list-dashboardd";
import BlogDetails from "./components/landing-pages/blogs/blog-details";
import UserLayout from "./components/layout/user-layout";
import LandingPageEvents from "./components/landing-pages/event/event-lists-page";
import BlogLists from "./components/landing-pages/blogs/blog-lists-page";
import ContactForm from "./components/form/contact-form";
import AboutPage from "./components/landing-pages/about/about";
import LandingPage from "./pages/landing-page";

function App() {
  return (

    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<UserLayout />} >
            <Route path="/" element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="event" element={<LandingPageEvents />} />
            <Route path="blogs" element={<BlogLists />} />
            <Route path="contact" element={<ContactForm />} />
            <Route path="event-details/:eventId" element={<EventDetails />} />
            <Route path="blog-details/:blogId" element={<BlogDetails />} />
          </Route>
          <Route path="/login" element={<AdminLoginFormPage />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />} >
              <Route element={<AdminLayout />} >
                <Route path="/dashboard">
                  <Route path="" element={<AdminDashboardPage />} />
                  <Route path="create-event" element={<EventPage />} />
                  <Route path="get-events" element={<EventLists />} />
                  <Route path="publish-blog" element={<BlogPage />} />
                  <Route path="inquiries" element={<InquiryPage />} />
                  <Route path="user-reviews" element={<UserReviewsPage />} />
                  <Route path="get-blogs" element={<BloglistAdmin />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </ >
  )
}

export default App
