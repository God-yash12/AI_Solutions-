import { ReviewServices } from "../../../services/review-service";
import ReviewCard from "../../ui/card/review-card";

const Review = () => {
  const { approvedData, approveLoading, approveError } = ReviewServices();

  if (approveLoading) return <p>Loading...</p>;
  if (approveError) return <p>Error: {approveError.message}</p>;
  if (!approvedData || approvedData.length === 0) {
    return <p className="text-center text-gray-500">No reviews available.</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h5 className="text-gray-600 uppercase text-sm tracking-wide">Testimonial</h5>
      <h1 className="text-2xl font-bold mt-2 mb-6 text-center">Customer’s Awesome Feedback</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4">
        {approvedData.map((data: any) => (
          <ReviewCard
            key={data._id}
            _id={data._id}
            name={data.name}
            image={data.image}
            description={data.description}
            company={data.company}
            position={data.position}
            ratings={data.ratings}
            isAdmin={false} 
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
