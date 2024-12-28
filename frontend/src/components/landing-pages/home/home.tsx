import HomeImage from "../../../assets/images/Home-image.png";
import PrimaryButton from "../../button/primary-button";
import SecondaryButton from "../../button/secondary-button";
import { useNavigate } from "react-router-dom";


const Home = () => {
  
  const navigate = useNavigate()

  return (
    <div>
      <div 
        className="relative  bg-cover bg-center"
        style={{ backgroundImage: `url(${HomeImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-white px-6 md:px-16 lg:px-20   py-44 flex flex-col justify-center items-start gap-1">
          <h2 className="uppercase text-sm md:text-lg lg:text-xl font-poppins tracking-widest">
            Welcome to AI Solution
          </h2>
          <h1 className="uppercase font-poppins text-4xl md:text-4xl lg:text-6xl font-bold">
            Top AI Solution Company
            <p className="text-blue-800">in the World</p>
          </h1>
          <p className=" font-poppins mt-4 max-w-3xl">
            Our company provides all AI-related software such as custom AI
            software, AI agents, AI consulting, and everything. Don't forget to
            visit our services and completed projects to get to know about us.
          </p>
          <div className="mt-8 flex space-x-4">
            <PrimaryButton onClick={() => navigate('/')}>What we do</PrimaryButton>
            <SecondaryButton >IT Services</SecondaryButton>
          </div>
        </div>

      </div>

      <div>
      </div>
    </div>
  );
};

export default Home;
