import { useState, useEffect } from "react";
import { ReviewServices } from "../../../services/review-service";
import ReviewCard from "../../ui/card/review-card";
import UserReviewForm from "../../form/user-reviews-form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; 
import Loader from "../../loader/loader";

const Review = () => {
  const { approvedData, approveLoading, approveError } = ReviewServices();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentIndex((preIndex) => {
         if(preIndex < approvedData.length){
          return preIndex - 1
         }else{
          return preIndex;
         }
      })
    }, 5000); 

    return () => clearInterval(autoSlide); 
  }, [approvedData]);

  // Handle next and previous slide
  const nextReview = () => {
    if (currentIndex < approvedData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevReview = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const goToReview = (index: number) => {
    setCurrentIndex(index);
  };

  if (approveLoading) return <Loader />;
  if (approveError) return <p>Error: {approveError.message}</p>;
  if (!approvedData || approvedData.length === 0) {
    return <p className="text-center text-gray-500">No reviews available.</p>;
  }

  return (
    <div className="container mx-auto relative">
      <div className="flex flex-col items-center mt-5">
        <h5 className="text-gray-600 uppercase text-sm tracking-wide font-poppins">Testimonial</h5>
        <h1 className="text-2xl font-bold mt-2 mb-6 text-center font-poppins">Customer’s Awesome Feedback</h1>

        {/* Slider Container */}
        <div className="relative w-full px-4 overflow-hidden">
          {/* Review Cards */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {approvedData.map((data: any) => (
              <div
                key={data._id}
                className="flex-shrink-0 w-full p-4 bg-white rounded-lg shadow-md text-center"
              >
                <ReviewCard
                  _id={data._id}
                  name={data.name}
                  image={data.image}
                  description={data.description}
                  company={data.company}
                  position={data.position}
                  ratings={data.ratings}
                  isAdmin={false}
                />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute top-1/2 left-4 lg:left-44 transform -translate-y-1/2 px-4 py-2 text-2xl  rounded-full opacity-90 hover:opacity-100 transition"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={nextReview}
            className="absolute top-1/2 right-4 lg:right-44 transform -translate-y-1/2 px-4 py-2 text-2xl rounded-full opacity-90 hover:opacity-100 transition"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {approvedData.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full bg-gray-500 ${
                index === currentIndex ? "bg-blue-700" : "bg-opacity-50"
              }`}
              onClick={() => goToReview(index)}
            />
          ))}
        </div>
      </div>

      <UserReviewForm />
    </div>
  );
};

export default Review;
