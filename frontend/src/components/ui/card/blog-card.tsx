import React from "react";
import SecondaryButton from "../../button/secondary-button";
import PrimaryButton from "../../button/primary-button";

type CardProps = {
    blogId: string;
    title: string;
    time: string;
    image: string;
    isAdmin: boolean;
    onEdit?: (blogId: string) => void;
    onDelete?: (blogId: string) => void;
    onReadMore?: (blogId: string) => void;
};




const Card: React.FC<CardProps> = ({
    blogId,
    title,
    time,
    image,
    isAdmin,
    onEdit,
    onDelete,
    onReadMore,
}) => {

    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="w-80 h-64">
                {image && (
                    <img
                        src={image}
                        alt={`${title}`}
                        className="w-full h-full p-5 object-cover rounded-md mb-4"
                    />
                )}
            </div>
            <p className="text-gray-500 text-sm">{time}</p>
            <h2 className="text-lg font-semibold mt-2">{title}</h2>
            <div className="flex gap-3 mt-3">
                {isAdmin ? (
                    <>
                        {onEdit && (
                            <SecondaryButton onClick={() => onEdit(blogId)}>Edit</SecondaryButton>
                        )}
                        {onDelete && (
                            <SecondaryButton onClick={() => onDelete(blogId)}>Delete</SecondaryButton>
                        )}
                    </>
                ) : (
                    onReadMore && (
                        <PrimaryButton onClick={() => onReadMore(blogId)}>Read More</PrimaryButton>
                    )
                )}
            </div>
        </div>
    );
};

export default Card;
