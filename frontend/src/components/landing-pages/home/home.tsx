import { useRef } from "react";
import HomeImage from "../../../assets/images/Home-image.png";
import PrimaryButton from "../../button/primary-button";
import SecondaryButton from "../../button/secondary-button";

const Home = () => {
  // Ref for the IT Services section
  const itServicesRef = useRef<HTMLDivElement>(null);

  const scrollToITServices = () => {
    itServicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${HomeImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-white px-6 md:px-16 lg:px-20 py-24  lg:py-44 flex flex-col justify-center item">
        <h2 className="uppercase text-sm md:text-lg lg:text-xl tracking-widest">
          Welcome to AI Solution
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
          Top AI Solution Company
          <p className="text-yellow-400">in the World</p>
        </h1>
        <p className="mt-4 max-w-3xl">
          Our company provides all AI-related software such as custom AI
          software, AI agents, AI consulting, and everything. Don't forget to
          visit our services and completed projects to get to know about us.
        </p>
        <div className="mt-8 flex space-x-4">
          <PrimaryButton onClick={scrollToITServices}>How IT Works</PrimaryButton>
          <SecondaryButton>IT Services</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
