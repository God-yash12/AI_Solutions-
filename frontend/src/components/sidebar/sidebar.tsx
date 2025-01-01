import { useState, useRef, useEffect } from "react";
import Logo from "../../assets/Logo.png";
import {
  MdDashboard,
  MdLogout,
  MdEventNote,
  MdContactPage,
} from "react-icons/md";
import { FaBars, FaNewspaper,FaClipboardList, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AdminService } from "../../services/admin-login";


const menuItems = [
  { name: "Dashboard", icon: MdDashboard, link: "/dashboard" },
  { name: "Contacts", icon: MdContactPage, link: "/dashboard/inquiries" },
  { name: "Reviews", icon: FaStar, link: "/dashboard/user-reviews" },
  { name: "Publish Event", icon: MdEventNote, link: "/dashboard/create-event" },
  { name: "Publish Blog", icon: FaNewspaper, link: "/dashboard/publish-blog" },
  { name: "Event Lists", icon: FaClipboardList, link: "/dashboard/get-events" },
  { name: "Blogs Lists", icon: FaClipboardList, link: "/dashboard/get-blogs" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const { handleLogout } = AdminService()
 

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative">
      {/* Hamburger Menu */}
      <button
        className="flex lg:hidden p-4 text-black mt-4"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Sidebar */}
      <nav
        ref={sidebarRef}
        className={`bg-[#37545C] h-screen z-50 lg:w-[350px] w-[250px] sm:w-[280px] md:w-[240px] flex flex-col fixed top-0 left-0 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="flex justify-center items-center py-5">
          <img src={Logo} alt="Logo" />
        </div>

        {/* Sidebar Menu */}
        <ul className="flex flex-col px-4 space-y-6 mt-8">
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index} onClick={() => setIsSidebarOpen(false)}>
              <li className="flex items-center gap-3 text-white text-lg font-medium cursor-pointer hover:text-[#FFA500] transition ml-4 lg:ml-8">
                <item.icon className="text-[#FFA500] text-xl" />
                <span>{item.name}</span>
              </li>
            </Link>
          ))}

          {/* Logout Button */}
          <li
            className="flex items-center gap-3 text-white text-lg font-medium cursor-pointer hover:text-[#FFA500] transition mt-8 ml-4 lg:ml-8"
            onClick={handleLogout}
          >
            <MdLogout className="text-[#FFA500] text-xl" />
            <span>Logout</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
