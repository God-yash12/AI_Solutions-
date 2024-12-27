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
        size={24} // Adjusted for larger star size
      />
    ));
  };

  return (
    <div className="mx-auto bg-white rounded-lg shadow-2xl overflow-hidden p-8 max-w-3xl">
      {/* Image */}
      <div className="flex justify-center mb-6">
        <img
          src={image} 
          alt={`${name}'s review`}
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200" 
        />
      </div>

      {/* Description */}
      <p className="text-gray-700 text-center text-xl mb-6">{description}</p>

      {/* Ratings */}
      <div className="flex justify-center mb-6">{renderStars()}</div>

      {/* Name, Company, and Position */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-lg text-gray-500">
          {position} at {company}
        </p>
      </div>

      {/* Admin Buttons */}
      {isAdmin && (
        <div className="mt-6 flex justify-center gap-6">
          <SecondaryButton
            disabled={disabled}
            onClick={() => onApprove && onApprove(_id)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            Approve
          </SecondaryButton>
          <SecondaryButton
            onClick={() => onDelete && onDelete(_id)}
            className={`bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 ${
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
