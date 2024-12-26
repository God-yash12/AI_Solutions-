import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <section >
        <main>
          <Outlet />
        </main>
      </section>
      <Footer />
    </div>
  );
}
