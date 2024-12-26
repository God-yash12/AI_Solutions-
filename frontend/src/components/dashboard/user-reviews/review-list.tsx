import Loader from "../../loader/loader";
import { ReviewServices } from "../../../services/review-service";
import ReviewCard from "../../ui/card/review-card";

const ReviewLists = () => {
  const { data, isLoading, error, onDeleteReview, handleApproveReview } = ReviewServices();

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;
  if (!Array.isArray(data) || data.length === 0)
    return <p className="text-center text-gray-500">No reviews available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((review: any) => (
        <ReviewCard
          key={review._id}
          _id={review._id}
          name={review.name}
          image={review.image}
          description={review.description}
          company={review.company}
          position={review.position}
          ratings={review.ratings}
          isAdmin={true}
          onApprove={handleApproveReview}
          onDelete={onDeleteReview}
          disabled={review.approved}
        />
      ))}
    </div>
  );
};

export default ReviewLists;
