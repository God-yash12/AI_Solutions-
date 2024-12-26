import React from "react";
import SecondaryButton from "../button/secondary-button";
import PrimaryButton from "../button/primary-button";
import { useNavigate } from "react-router-dom";

type CardProps = {
  title: string;
  date: string;
  image: string[];
  isAdmin: boolean;
  onEdit?: (eventId: string) => void;
  onDelete?: (eventId: string) => void;
  eventId: string;
};

const Card: React.FC<CardProps> = ({
  title,
  date,
  image,
  isAdmin,
  onDelete,
  eventId,
  onEdit,
}) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/event-details/${eventId}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Responsive image with a fixed aspect ratio */}
      <div className="w-full h-64 aspect-w-4 aspect-h-3">
        {image.length > 0 && (
          <img
            src={image[0]}
            alt="Card Image"
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>

      <p className="text-gray-500 text-sm mt-2">{date}</p>
      <h2 className="text-lg font-semibold mt-2">{title}</h2>

      {/* Conditional rendering for admin-specific buttons */}
      {isAdmin ? (
        <div className="flex gap-3 mt-3">
          {onEdit && (
            <SecondaryButton onClick={() => onEdit?.(eventId)}>Edit</SecondaryButton>
          )}
          {onDelete && (
            <SecondaryButton onClick={() => onDelete?.(eventId)}>Delete</SecondaryButton>
          )}
        </div>
      ) : (
        <div className="flex gap-3 mt-3">
          <PrimaryButton onClick={handleReadMore}>Read More</PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Card;
