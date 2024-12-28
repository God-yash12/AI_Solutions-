import AboutImage from "../../../assets/images/about-image.png";
import { PiCertificateFill, PiGlobeBold } from "react-icons/pi";
import SecondaryButton from "../../button/secondary-button";
import { useNavigate } from "react-router-dom";

const AboutUsLandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center px-4 py-8">
      {/* Title Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-poppins text-blue-700 font-bold">Who We Are</h1>
      </div>

      {/* Image and Content Section */}
      <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24 w-full max-w-6xl">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src={AboutImage}
            alt="Company"
            className="w-full h-auto rounded-md shadow-lg"
          />
        </div>

        {/* Content Section */}
        <div className="flex-grow w-full md:w-1/2 mt-6 md:mt-0">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Delivering Innovative AI Solutions with Cutting-Edge AI Technologies
          </h2>
          <p className="text-gray-700 mb-6 text-sm md:text-base">
            At <strong>AI SOLUTION</strong>, we specialize in providing state-of-the-art AI services tailored to meet the evolving needs of businesses. With a commitment to excellence and innovation, we empower organizations to harness the power of technology to achieve their goals.
          </p>

          <div className="flex flex-col gap-8">
            {/* Certified Company Section */}
            <div className="flex items-start gap-4 md:gap-6">
              <div className="text-blue-500 bg-blue-100 rounded-full p-3">
                <PiCertificateFill size={30} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold">Certified Excellence</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Recognized as a certified company by industry-leading organizations, we ensure compliance with global standards. Our certifications reflect our dedication to delivering reliable, secure, and efficient solutions across various domains, including Computer Vision, cybersecurity, and artificial intelligence.
                </p>
              </div>
            </div>

            {/* Global Reach Section */}
            <div className="flex items-start gap-4 md:gap-6">
              <div className="text-green-500 bg-green-100 rounded-full p-3">
                <PiGlobeBold size={30} />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold">Global Reach</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  With a presence in over 50 countries, we cater to a diverse clientele ranging from startups to Fortune 500 companies. Our global reach enables us to deliver tailored solutions that address unique challenges across different markets and industries.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="mt-6">
            <SecondaryButton onClick={() => navigate("/about")}>
              Learn More About Us
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsLandingPage;
