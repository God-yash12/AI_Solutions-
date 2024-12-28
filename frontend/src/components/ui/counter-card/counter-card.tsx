import React from "react";
import { IconType } from "react-icons/lib";
import { EventService } from "../../../services/event-services";

interface CounterCardProps {
  amount?: number;
  cardName: string;
  icon: IconType;
}

const DashboardCountCard: React.FC<CounterCardProps> = (props) => {

  const { totalEventData, totalEventError } = EventService()

  return (
    <div className="bg-[#FFFFFF] shadow-lg h-28 border-[1px] rounded-tr-3xl flex items-center justify-between p-4">
      {/* Card content */}
      <div className="flex flex-col justify-start gap-5">
        <p className="font-semibold text-2xl">{props.amount}</p>
        <p className="text-sm text-gray-600">{props.cardName}</p>
      </div>
      {/* Image/Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#D8ECF1]">
        <div className="flex justify-center items-center w-full h-full">
          <props.icon className="text-center text-5xl text-yellow-500 " />
        </div>
      </div>
    </div>
  );
};

export default DashboardCountCard;
