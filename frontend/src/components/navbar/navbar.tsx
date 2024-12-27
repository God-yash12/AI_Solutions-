import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const [top, setTop] = useState(0);
  const prevScrollPos = useRef(window.scrollY);
  const navigate = useNavigate();

  const navItems = [
    { id: 1, name: "home", path: "" },
    { id: 2, name: "about", path: "about" },
    { id: 3, name: "blogs", path: "blogs" },
    { id: 4, name: "event", path: "event" },
    { id: 5, name: "contact", path: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (prevScrollPos.current > currentScrollPos) {
        setTop(0);
      } else {
        setTop(-180);
      }

      prevScrollPos.current = currentScrollPos;
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as HTMLElement).closest(".sidebar")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


  const handleNavClick = (item: { name: string; path: string }) => {
    setActiveItem(item.name);
    setIsOpen(false);
    navigate(`/${item.path}`);
  };

  return (
    <nav
      style={{ top: `${top}px` }}
      className="fixed w-full h-18 top-0 z-50 transition-all duration-300 bg-gray-900 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="rounded-full p-2">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full mt-5 object-contain cursor-pointer"
              onClick={() => handleNavClick(navItems[0])} // Redirect to home
            />
          </div>

          {/* Hamburger Menu */}
          <div className="block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Nav Links for Desktop */}
          <div className="hidden lg:flex font-poppins  space-x-16">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`relative text-gray-300 hover:text-orange-500 ${
                  activeItem === item.name ? "text-orange-500" : ""
                }`}
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 transition-all duration-300 ${
                    activeItem === item.name ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </div>
          <div></div>
        </div>

        {/* Sidebar for Medium/Small Screens */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-3/4 h-full bg-gray-800 shadow-lg transition-transform duration-300 transform sidebar">
            <div className="flex flex-col items-center space-y-6 mt-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`relative text-gray-300 hover:text-orange-500 ${
                    activeItem === item.name ? "text-orange-500" : ""
                  }`}
                >
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-[2px] bg-orange-500 transition-all duration-300 ${
                      activeItem === item.name ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
