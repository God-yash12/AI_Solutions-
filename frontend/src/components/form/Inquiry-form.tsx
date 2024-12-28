import { useState } from "react";
import InputField from "../input/input";
import { TextField } from "@mui/material";
import SecondaryButton from "../button/secondary-button";
import PrimaryButton from "../button/primary-button";
import { useInquiryServices } from "../../services/inquiry-service";
import { AiOutlineCloseCircle, AiOutlineQuestionCircle } from "react-icons/ai"; // Import icons

const InquiryForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, errors, handleInquirySubmit, register } = useInquiryServices();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Inquiry Icon */}
      <div
        className="fixed bottom-5 right-5 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer"
        onClick={toggleModal}
      >
        <AiOutlineQuestionCircle size={24} /> 
      </div>

      {/* Inquiry Modal */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={toggleModal}
            >
              <AiOutlineCloseCircle size={24} /> {/* Close icon */}
            </button>

            <h2 className="text-xl font-semibold mb-4">Inquiry</h2>
            <form onSubmit={handleSubmit(handleInquirySubmit)}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <select
                  {...register("title", { required: "Title is required" })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                >
                  <option value="" disabled>Select a Inquiry title</option>
                  <option value="Custom AI Software Development">Custom AI Software Development</option>
                  <option value="Machine Learning Model Creation">Machine Learning Model Creation</option>
                  <option value="Computer Vision Solutions">Computer Vision Solutions</option>
                  <option value="Natural Language Processing (NLP)">Natural Language Processing (NLP)</option>
                  <option value="AI Education and Consulting">AI Education and Consulting</option>
                  <option value="AI-Powered Predictive Analytics">AI-Powered Predictive Analytics</option>
                </select>
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
              </div>

              {/* Email */}
              <div className="mb-4">
                <InputField
                  variant="outlined"
                  label="Email"
                  {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email address" } })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              {/* Description */}
              <div className="mb-4">
                <TextField
                  label="Inquiry Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  {...register("description", { required: "Description is required" })}
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
              </div>

              <div className="flex justify-between mt-5">
                <SecondaryButton
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Send Inquiry
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default InquiryForm;
