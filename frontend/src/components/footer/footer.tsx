import React from "react";
import { FaFacebook, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import PrimaryButton from "../button/primary-button";
import Logo from "../../assets/Logo.png"
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";


const Footer: React.FC = () => {
  return (
 

    <footer className="bg-[#001539] text-gray-300 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-16">
          {/* column1: logoa and info */}
          <div>
            <img src={Logo} alt="Logo" />
            <p className="py-3">
             The most trusted AI Company in UK who deliver AI solutions all over the world even in the country like Nepal.
            </p>

            <PrimaryButton>
              Discover More 
            </PrimaryButton>
          </div>
          {/* Column 2: Company Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                <a href="#" className="text-gray-300 hover:text-white transition duration-200">
                  Home
                </a>
              </li>
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                <Link to="/about" className="text-gray-300 hover:text-white transition duration-200">
                  About Us
                </Link>
              </li>
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                <Link to="/events" className="text-gray-300 hover:text-white transition duration-200">
                  Event
                </Link>
              </li>
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                <Link to="/contact" className="text-gray-300 hover:text-white transition duration-200">
                  Careers/Contact
                </Link>
              </li>
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                <Link to="/blogs" className="text-gray-300 hover:text-white transition duration-200">
                  Blogs
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                Custom AI Software
              </li>
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                Machine Learning Model Creation
              </li>
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                Computer Vision Solutions
              </li>
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                Natural Language Processing (NLP)
              </li>
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                AI-Powered Predictive Analytics
              </li>
              <li className="flex items-center">
                <MdArrowForward className="text-blue-900 mr-2" size={18} />
                AI Education and Consulting
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Newsletter
            </h4>
            <p className="text-sm mb-4">
              Subscribe to our latest newsletter and stay updated with our
              offers and news.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="px-4 py-2 bg-transparent border border-white text-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              />
              <PrimaryButton
                type="submit"
              >
                Subscribe
              </PrimaryButton>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © 2024 AI Solution. Designed and Develop By{" "}
            <span className="text-orange-500">Ganesh Thapa</span>
          </p>
          <div className="flex space-x-4 mt-4 mr-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"><FaLinkedinIn /></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"><FaInstagram /></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin-in"><FaFacebook /></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
   
  );
};

export default Footer;
