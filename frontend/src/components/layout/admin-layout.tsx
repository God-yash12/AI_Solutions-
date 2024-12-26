import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import Topbar from "../dashboard/topbar/topbar";


export default function AdminLayout() {
  return (
    <div>
      <Sidebar />
      <section className="p-4 lg:ml-[350px]">
         <Topbar />
        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
}
