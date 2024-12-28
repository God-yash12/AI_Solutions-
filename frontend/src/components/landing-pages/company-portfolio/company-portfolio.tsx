import HtlImage from "../../../assets/images/htlImage.png"
import Daraz from "../../../assets/images/daraz.png";
import Esewa from "../../../assets/images/esewa.png";
import Ismt from "../../../assets/images/ismt.png"
import { Link } from "react-router-dom";
import SecondaryButton from "../../button/secondary-button";

const data = [
  {
    id: 1,
    img: Esewa,
    companyName: "Esewa",
    title: "Esewa Custom AI Agent Bot",
  },
  {
    id: 2,
    img: Ismt,
    companyName: "ISMT College",
    title: "AI Powered Consulting bot",
  },
  {
    id: 3,
    img: Daraz,
    companyName: "Daraz",
    title: "AI powered predictive analytics bot to increase sales",
  },
  {
    id: 4,
    img: HtlImage,
    companyName: "Hotel Crown In",
    title: "AI bot integration on Website for Inquiry",
  },
];

const CompanyPortfolio = () => {
  return (
    <div className="relative my-20">
      <div className=" container mx-auto text-center">
        <p className="uppercase text-blue-700 text-md font-poppins">Company Portfolio</p>
        <h2 className="uppercase font-semibold font-poppins text-gray-800 text-2xl lg:text-4xl">
          Our Complete Project
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-16">
        {data.map((item) => (
          <div key={item.id} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
            <div className="lg:w-72 lg:h-56">
              <img src={item.img} alt={item.companyName} className="w-full h-full rounded-lg mb-4" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800">{item.companyName}</h4>
            <p className="text-gray-600 mb-4">{item.title}</p>
            <Link to={""} className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <SecondaryButton>
                Explore
              </SecondaryButton>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyPortfolio;
