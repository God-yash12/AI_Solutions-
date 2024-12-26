import { useState } from "react";
import { MdNotifications } from "react-icons/md";
import HeaderImage from "../../../assets/images/header image.png"
import SectionHeading from "../../ui/typography/section-heading";

const Topbar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <header className="container mx-auto flex flex-row justify-between items-center mb-10">
      {/* date and time */}
      <div>
        <SectionHeading>Good Morning Ganesh</SectionHeading>
        <p className="text-xl text-[#676363] font-Poppins">
          {date.toDateString()}
        </p>
      </div>

      {/* user profile and notification  */}
      <div className="flex flex-row items-center justify-between gap-8 mr-8 lg:mr-12">
        <div className=" flex flex-col justify-center items-center gap-3">
          <div className="flex flex-col justify-center items-center bg-[#D9D9D9] rounded-full w-12 h-12">
            <MdNotifications className="text-4xl text-gray-700" />
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center gap-3">
        <div className="flex flex-col justify-center items-center bg-[#D9D9D9]rounded-full w-12 h-12">
          <img
            src={HeaderImage}
            alt="user Image"
            className="w-full h-full rounded-full"
          />
        </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
