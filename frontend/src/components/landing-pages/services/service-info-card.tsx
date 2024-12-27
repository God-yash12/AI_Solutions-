import { FaRobot, FaBrain, FaCamera, FaLanguage, FaChalkboardTeacher, FaChartLine } from "react-icons/fa";
import CardImage from "../../../assets/images/Service-image.png";

const services = [
  {
    title: "Custom AI Software Development",
    description:
      "Build AI-powered software tailored to specific business needs, such as predictive analytics, recommendation engines, or automated decision-making systems.",
    icon: <FaRobot />,
  },
  {
    title: "Machine Learning Model Creation",
    description:
      "Develop and train machine learning models for applications like fraud detection, customer behavior analysis, or product recommendations.",
    icon: <FaBrain />,
  },
  {
    title: "Computer Vision Solutions",
    description:
      "Implement image and video analysis systems for tasks such as facial recognition, object detection, and quality assurance in manufacturing.",
    icon: <FaCamera />,
  },
  {
    title: "Natural Language Processing (NLP)",
    description:
      "Create solutions for understanding and generating human language, such as chatbots, sentiment analysis tools, or language translation systems.",
    icon: <FaLanguage />,
  },
  {
    title: "AI Education and Consulting",
    description:
      "Offer training programs, workshops, and consulting services to help businesses understand AI's potential and implement AI-driven solutions effectively.",
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "AI-Powered Predictive Analytics",
    description:
      "Provide forecasting and trend analysis for industries such as finance, healthcare, and retail, helping organizations make data-driven decisions.",
    icon: <FaChartLine />,
  },
];

const ServiceInfoCard = () => {
  return (
    <div className="relative w-full">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 w-full"
        style={{
          backgroundImage: `url(${CardImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <div className="absolute inset-0 bg-blue-500 bg-opacity-30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 p-6 md:p-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-white text-center mb-12">
          <h3 className="text-xl text-blue-700 md:text-xl uppercasefont-poppins">Service we provide</h3>
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold uppercase">
            All professionals we're offering best
          </h1>
          <p className="text-2xl md:text-4xl lg:text-4xl font-poppins font-bold uppercase">
            AI solutions & <span className="text-blue-700">Services</span>
          </p>
        </div>

        {/* Services Section */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white bg-opacity-80 rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4 overflow-hidden"
            >
              {/* Decorative Half Circles */}
              <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-400 bg-opacity-30 rounded-full"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-400 bg-opacity-30 rounded-full"></div>

              {/* Icon */}
              <div className="text-blue-500 text-4xl flex-shrink-0 md:mr-4">{service.icon}</div>

              {/* Content */}
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-gray-800 font-poppins">{service.title}</h3>
                <p className="text-sm text-gray-600 font-poppins">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceInfoCard;