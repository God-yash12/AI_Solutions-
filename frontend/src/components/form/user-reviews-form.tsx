import { useState } from "react";
import PrimaryButton from "../button/primary-button";
import Inputfield from "../input/input";
import UserReviewServices from "../../services/user-review-service";


const UserReviewsForm = () => {



  const { onSubmit, error, errors, setValue, register, handleSubmit } = UserReviewServices();
  const [rating, setRating] = useState<number>(0);

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
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Rate us Your Experience</h2>
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
        <Inputfield variant="outlined" label="Description" {...register("description")} className="mb-4" />
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Your Profile Image</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange} 
            className="w-full mt-1 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>

        {/* <Inputfield variant="outlined" label="ratings" {...register("ratings")}  /> */}

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
                  className={`inline-block text-5xl cursor-pointer ${rating >= value ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <PrimaryButton type="submit" className="w-full py-3 mt-4" >
          {/* {isLoading ? "Submitting..." : "Rate Now"}
           */}
           Submit
        </PrimaryButton>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">Failed to submit your review. Please try again later.</p>}
      </form>
    </div>
  );
};

export default UserReviewsForm;
