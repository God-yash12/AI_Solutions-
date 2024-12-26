import React from "react";
import { FaStar } from "react-icons/fa";
import SecondaryButton from "../../button/secondary-button";

type ReviewProps = {
  _id: string;
  name: string;
  image?: string;
  description: string;
  company: string;
  position: string;
  ratings: number; 
  isAdmin?: boolean; 
  disabled?: boolean;
  onApprove?: (reviewId: string) => void; 
  onDelete?: (reviewId: string) => void; 
};

const ReviewCard: React.FC<ReviewProps> = ({
  _id,
  name,
  image,
  description,
  company,
  position,
  ratings,
  isAdmin = false,
  onApprove,
  onDelete,
  disabled = false,
}) => {
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        color={index < ratings ? "#FFD700" : "#e4e5e9"} 
        size={20}
      />
    ));
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
      {/* Image */}
      <div className="flex justify-center mb-4">
        <img
          src={image || "https://via.placeholder.com/100"} 
          alt={`${name}'s review`}
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      {/* Description */}
      <p className="text-gray-700 text-center mb-4">{description}</p>

      {/* Ratings */}
      <div className="flex justify-center mb-4">{renderStars()}</div>

      {/* Name, Company, and Position */}
      <div className="text-center">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-gray-500">
          {position} at {company}
        </p>
      </div>

      {/* Admin Buttons */}
      {isAdmin && (
        <div className="mt-6 flex justify-around gap-4">
          <SecondaryButton
            disabled = {disabled}
            onClick={() => onApprove && onApprove(_id)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Approve
          </SecondaryButton>
          <SecondaryButton
            onClick={() => onDelete && onDelete(_id)}
            className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${
              disabled ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400" : ""
            }`}
            
          >
            Delete
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
