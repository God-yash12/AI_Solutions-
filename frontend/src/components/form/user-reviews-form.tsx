import { useState } from "react";
import { Star, X } from "lucide-react";
import PrimaryButton from "../button/primary-button";
import Inputfield from "../input/input";
import UserReviewServices from "../../services/user-review-service";
import { TextareaAutosize } from "@mui/material";

const ReviewPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { onSubmit, error, errors, setValue, register, handleSubmit } = UserReviewServices();
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
    setValue("ratings", value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        setValue('image', file);
      } else {
        alert('Please select a valid image file (png, jpeg, jpg).');
        e.target.value = '';
      }
    } else {
      alert('No file selected.');
    }
  };

  return (
    <>
     
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="absolute right-8 top-1/2 -translate-y-12 flex flex-col items-center gap-2 z-50"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg">
            <Star className="w-8 h-8 text-white" />
          </div>
          <span className="text-sm font-medium text-blue-500 font-poppins">Rate Us</span>
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          {/* Modal Content */}
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Form Content */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-center font-poppins mb-4">Rate Your Experience</h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center gap-5"
              >
                {/* Name */}
                <Inputfield variant="outlined" label="Name" {...register("name")} className="mb-4" />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                {/* Company Name */}
                <Inputfield variant="outlined" label="Company Name" {...register("company")} className="mb-4" />
                {errors.company && <p className="text-red-500">{errors.company.message}</p>}

                {/* Position */}
                <Inputfield variant="outlined" label="Position" {...register("position")} className="mb-4" />
                {errors.position && <p className="text-red-500">{errors.position.message}</p>}

                {/* Description */}
                <TextareaAutosize   
                 aria-label="minimum height"
                minRows={3} 
                placeholder="Description"
                {...register("description")}               
                className="text-lg sm:w-80 font-poppins font-normal leading-5 px-3 py-4 rounded-lg shadow-md  focus:ring-2 ring-blue-700 "
                
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Profile Image</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    className=" mt-1 border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {errors.image && <p className="text-red-500">{errors.image.message}</p>}
                </div>

                {/* Star Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rate the Company</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value}>
                        <input
                          type="radio"
                          value={value}
                          checked={rating === value}
                          {...register("ratings")}
                          onChange={() => handleRatingChange(value)}
                          className="hidden"
                        />
                        <span
                          className={`inline-block text-5xl cursor-pointer ${rating >= value ? "text-yellow-500" : "text-gray-300"
                            }`}
                        >
                          ★
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <PrimaryButton type="submit" className="w-full py-3 mt-4">
                  Submit
                </PrimaryButton>

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 mt-2">
                    Failed to submit your review. Please try again later.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewPopup;